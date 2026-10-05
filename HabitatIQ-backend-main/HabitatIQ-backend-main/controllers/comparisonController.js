import Comparison from '../models/Comparison.js';
import Property from '../models/Property.js';

// @desc    Add property to compare list
// @route   POST /api/compare
// @access  Private
export const addPropertyToCompare = async (req, res, next) => {
    try {
        const { propertyId } = req.body;

        const property = await Property.findById(propertyId);
        if (!property) {
            res.status(404);
            throw new Error('Property not found');
        }

        // Check current count
        const count = await Comparison.countDocuments({ userId: req.user._id });
        if (count >= 3) {
            res.status(400);
            throw new Error('Compare list limit reached (maximum 3 properties)');
        }

        const alreadyAdded = await Comparison.findOne({ userId: req.user._id, propertyId });
        if (alreadyAdded) {
            res.status(400);
            throw new Error('Property is already in compare list');
        }

        const compareItem = await Comparison.create({
            userId: req.user._id,
            propertyId,
        });

        res.status(201).json(compareItem);
    } catch (error) {
        next(error);
    }
};

// @desc    Get compared properties
// @route   GET /api/compare
// @access  Private
export const getComparedProperties = async (req, res, next) => {
    try {
        const comparedItems = await Comparison.find({ userId: req.user._id })
            .populate('propertyId');
        
        res.json(comparedItems);
    } catch (error) {
        next(error);
    }
};

// @desc    Remove property from compare
// @route   DELETE /api/compare/:propertyId
// @access  Private
export const removeComparedProperty = async (req, res, next) => {
    try {
        const compareItem = await Comparison.findOne({ userId: req.user._id, propertyId: req.params.propertyId });
        if (compareItem) {
            await compareItem.deleteOne();
            res.json({ message: 'Property removed from comparison' });
        } else {
            res.status(404);
            throw new Error('Compared property not found');
        }
    } catch (error) {
        next(error);
    }
};
