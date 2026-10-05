import mongoose from 'mongoose';

const propertyImageSchema = new mongoose.Schema(
    {
        propertyId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Property',
        },
        imageUrl: {
            type: String,
            required: true,
        },
        isPrimary: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

propertyImageSchema.index({ propertyId: 1 });

const PropertyImage = mongoose.model('PropertyImage', propertyImageSchema);

export default PropertyImage;
