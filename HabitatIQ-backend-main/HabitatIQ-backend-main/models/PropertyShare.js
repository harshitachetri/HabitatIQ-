import mongoose from 'mongoose';

const propertyShareSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        propertyId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Property',
        },
        platform: {
            type: String,
            enum: ['whatsapp', 'email', 'link'],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

propertyShareSchema.index({ userId: 1, propertyId: 1 });

const PropertyShare = mongoose.model('PropertyShare', propertyShareSchema);

export default PropertyShare;
