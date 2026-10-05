import mongoose from 'mongoose';

const comparisonSchema = new mongoose.Schema(
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

comparisonSchema.index({ userId: 1, propertyId: 1 }, { unique: true });

const Comparison = mongoose.model('Comparison', comparisonSchema);

export default Comparison;
