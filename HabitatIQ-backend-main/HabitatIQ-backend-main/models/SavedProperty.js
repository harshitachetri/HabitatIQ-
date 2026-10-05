import mongoose from 'mongoose';

const savedPropertySchema = new mongoose.Schema(
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
    },
    {
        timestamps: true,
    }
);

// A user should only be able to save a property once
savedPropertySchema.index({ userId: 1, propertyId: 1 }, { unique: true });

const SavedProperty = mongoose.model('SavedProperty', savedPropertySchema);

export default SavedProperty;
