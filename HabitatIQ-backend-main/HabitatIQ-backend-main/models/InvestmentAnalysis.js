import mongoose from 'mongoose';

const investmentAnalysisSchema = new mongoose.Schema(
    {
        propertyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property',
        },
        purchasePrice: {
            type: Number,
            required: true,
        },
        estimatedRent: {
            type: Number,
            required: true,
        },
        appreciationRate: {
            type: Number,
            required: true,
        },
        annualROI: {
            type: Number,
            required: true,
        },
        fiveYearROI: {
            type: Number,
            required: true,
        },
        investmentScore: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

investmentAnalysisSchema.index({ propertyId: 1 });

const InvestmentAnalysis = mongoose.model('InvestmentAnalysis', investmentAnalysisSchema);

export default InvestmentAnalysis;
