import mongoose from 'mongoose';

const visitRequestSchema = new mongoose.Schema(
    {
        propertyId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Property',
        },
        buyerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        visitDate: {
            type: Date,
            required: true,
        },
        visitTime: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

visitRequestSchema.index({ propertyId: 1, buyerId: 1 });
visitRequestSchema.index({ ownerId: 1 });

const VisitRequest = mongoose.model('VisitRequest', visitRequestSchema);

export default VisitRequest;
