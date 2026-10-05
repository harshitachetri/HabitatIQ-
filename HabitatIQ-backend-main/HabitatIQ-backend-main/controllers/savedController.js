import SavedProperty from '../models/SavedProperty.js';

// @desc    Save property
// @route   POST /api/saved/:propertyId
// @access  Private
export const saveProperty = async (req, res, next) => {
    try {
        const { propertyId } = req.params;

        const alreadySaved = await SavedProperty.findOne({ userId: req.user._id, propertyId });

        if (alreadySaved) {
            res.status(400);
            throw new Error('Property already saved');
        }

        const savedItem = await SavedProperty.create({
            userId: req.user._id,
            propertyId,
        });

        res.status(201).json(savedItem);
    } catch (error) {
        next(error);
    }
};

// @desc    Remove saved property
// @route   DELETE /api/saved/:propertyId
// @access  Private
export const removeSavedProperty = async (req, res, next) => {
    try {
        const { propertyId } = req.params;

        const savedItem = await SavedProperty.findOne({ userId: req.user._id, propertyId });

        if (savedItem) {
            await savedItem.deleteOne();
            res.json({ message: 'Saved property removed' });
        } else {
            res.status(404);
            throw new Error('Saved property not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get saved properties
// @route   GET /api/saved
// @access  Private
export const getSavedProperties = async (req, res, next) => {
    try {
        const savedProperties = await SavedProperty.find({ userId: req.user._id })
            .populate('propertyId');
        
        res.json(savedProperties);
    } catch (error) {
        next(error);
    }
};
