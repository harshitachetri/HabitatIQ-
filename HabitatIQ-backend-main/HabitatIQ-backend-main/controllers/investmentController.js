import express from 'express';
import { calculateROI } from '../utils/roiCalculator.js';
import InvestmentAnalysis from '../models/InvestmentAnalysis.js';
import { protect } from '../middleware/authMiddleware.js';

// @desc    Analyze investment potential
// @route   POST /api/investment/analyze
// @access  Public / Private
export const analyzeInvestment = async (req, res, next) => {
    try {
        const { purchasePrice, estimatedRent, appreciationRate, propertyId } = req.body;

        if (!purchasePrice || !estimatedRent || !appreciationRate) {
            res.status(400);
            throw new Error('Please provide purchasePrice, estimatedRent, and appreciationRate');
        }

        const analysis = calculateROI(Number(purchasePrice), Number(estimatedRent), Number(appreciationRate));

        // Save if propertyId and auth exist
        if (propertyId && req.user) {
            await InvestmentAnalysis.create({
                propertyId,
                purchasePrice,
                estimatedRent,
                appreciationRate,
                annualROI: analysis.annualROI,
                fiveYearROI: analysis.fiveYearROI,
                investmentScore: analysis.investmentScore
            });
        }

        res.json(analysis);
    } catch (error) {
        next(error);
    }
};

const router = express.Router();

router.post('/analyze', analyzeInvestment);

export default router;
