import Property from '../models/Property.js';

// @desc    Fetch all properties
// @route   GET /api/properties
// @access  Public
export const getProperties = async (req, res, next) => {
    try {
        const pageSize = 10;
        const page = Number(req.query.pageNumber) || 1;

        const keyword = req.query.keyword
            ? {
                  title: {
                      $regex: req.query.keyword,
                      $options: 'i',
                  },
              }
            : {};

        const stateFilter = req.query.state ? { state: req.query.state } : {};
        const cityFilter = req.query.city ? { city: req.query.city } : {};
        const localityFilter = req.query.locality ? { locality: req.query.locality } : {};
        const typeFilter = req.query.propertyType ? { propertyType: req.query.propertyType } : {};
        const bedsFilter = req.query.bedrooms ? { bedrooms: Number(req.query.bedrooms) } : {};
        
        let priceFilter = {};
        if (req.query.minPrice || req.query.maxPrice) {
            priceFilter.price = {};
            if (req.query.minPrice) priceFilter.price.$gte = Number(req.query.minPrice);
            if (req.query.maxPrice) priceFilter.price.$lte = Number(req.query.maxPrice);
        }

        const query = { ...keyword, ...stateFilter, ...cityFilter, ...localityFilter, ...typeFilter, ...bedsFilter, ...priceFilter };

        const count = await Property.countDocuments(query);
        const properties = await Property.find(query)
            .populate('owner', 'name email phone')
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort({ createdAt: -1 });

        res.json({ properties, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        next(error);
    }
};

// @desc    Fetch single property
// @route   GET /api/properties/:id
// @access  Public
export const getPropertyById = async (req, res, next) => {
    try {
        const property = await Property.findById(req.params.id).populate('owner', 'name email phone');

        if (property) {
            res.json(property);
        } else {
            res.status(404);
            throw new Error('Property not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Create a property
// @route   POST /api/properties
// @access  Private/Seller
export const createProperty = async (req, res, next) => {
    try {
        const property = new Property({
            ...req.body,
            owner: req.user._id,
        });

        const createdProperty = await property.save();
        res.status(201).json(createdProperty);
    } catch (error) {
        next(error);
    }
};

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private/Seller
export const updateProperty = async (req, res, next) => {
    try {
        const property = await Property.findById(req.params.id);

        if (property) {
            // Check ownership
            if (property.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                res.status(401);
                throw new Error('Not authorized to update this property');
            }

            Object.assign(property, req.body);
            const updatedProperty = await property.save();
            res.json(updatedProperty);
        } else {
            res.status(404);
            throw new Error('Property not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private/Seller
export const deleteProperty = async (req, res, next) => {
    try {
        const property = await Property.findById(req.params.id);

        if (property) {
            // Check ownership
            if (property.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                res.status(401);
                throw new Error('Not authorized to delete this property');
            }

            await property.deleteOne();
            res.json({ message: 'Property removed' });
        } else {
            res.status(404);
            throw new Error('Property not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Upload images for a property
// @route   POST /api/properties/:id/images
// @access  Private/Seller
export const uploadPropertyImages = async (req, res, next) => {
    try {
        const property = await Property.findById(req.params.id);

        if (property) {
            // Check ownership
            if (property.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                res.status(401);
                throw new Error('Not authorized to upload images for this property');
            }
            
            // Assume req.body.images contains array of URLs after upload to cloud (like AWS S3/Cloudinary)
            if (req.body.images && Array.isArray(req.body.images)) {
                property.images = [...property.images, ...req.body.images];
                await property.save();
                res.json(property);
            } else {
                res.status(400);
                throw new Error('No images provided');
            }
        } else {
            res.status(404);
            throw new Error('Property not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get gallery images of a property
// @route   GET /api/properties/:id/images
// @access  Public
export const getPropertyImages = async (req, res, next) => {
    try {
        const property = await Property.findById(req.params.id);
        if (property) {
            res.json(property.images);
        } else {
            res.status(404);
            throw new Error('Property not found');
        }
    } catch (error) {
        next(error);
    }
};
