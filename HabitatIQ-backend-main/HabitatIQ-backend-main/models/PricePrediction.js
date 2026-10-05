import mongoose from 'mongoose';

const pricePredictionSchema = new mongoose.Schema(
    {
        propertyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property',
        },
        predictedPrice: {
            type: Number,
            required: true,
        },
        confidenceScore: {
            type: Number,
            required: true,
        },
        sizeEfficiency: {
            type: Number,
            required: true,
        },
        locationMultiplier: {
            type: Number,
            required: true,
        },
        bedroomFactor: {
            type: Number,
            required: true,
        },
        bathroomFactor: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

pricePredictionSchema.index({ propertyId: 1 });

const PricePrediction = mongoose.model('PricePrediction', pricePredictionSchema);

export default PricePrediction;
