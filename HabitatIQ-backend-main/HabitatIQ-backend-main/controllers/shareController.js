import PropertyShare from '../models/PropertyShare.js';
import Property from '../models/Property.js';

// @desc    Share property
// @route   POST /api/share/:propertyId
// @access  Private
export const shareProperty = async (req, res, next) => {
    try {
        const { propertyId } = req.params;
        const { platform } = req.body;

        if (!['whatsapp', 'email', 'link'].includes(platform)) {
            res.status(400);
            throw new Error('Invalid platform');
        }

        const property = await Property.findById(propertyId);
        if (!property) {
            res.status(404);
            throw new Error('Property not found');
        }

        const shareItem = await PropertyShare.create({
            userId: req.user._id,
            propertyId,
            platform,
        });

        res.status(201).json({
            message: `Property shared successfully via ${platform}`,
            shareItem
        });
    } catch (error) {
        next(error);
    }
};
