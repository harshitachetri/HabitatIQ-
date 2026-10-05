import express from 'express';
import { calculatePricePrediction } from '../services/pricePredictionService.js';
import PricePrediction from '../models/PricePrediction.js';
import { protect } from '../middleware/authMiddleware.js';

// @desc    Predict property price
// @route   POST /api/predict-price
// @access  Public / Private (can log it if Private)
export const predictPrice = async (req, res, next) => {
    try {
        const { state, city, locality, areaSqft, bedrooms, bathrooms, propertyType, propertyId } = req.body;

        const predictionResult = calculatePricePrediction({
            state, city, locality, areaSqft, bedrooms, bathrooms, propertyType
        });

        // Optionally save the prediction if property ID is provided and user is authenticated
        if (propertyId && req.user) {
            await PricePrediction.create({
                propertyId,
                ...predictionResult
            });
        }

        res.json({
            predictedPrice: predictionResult.predictedPrice,
            confidenceScore: predictionResult.confidenceScore,
            details: {
                sizeEfficiency: predictionResult.sizeEfficiency,
                locationMultiplier: predictionResult.locationMultiplier,
                bedroomFactor: predictionResult.bedroomFactor,
                bathroomFactor: predictionResult.bathroomFactor,
            }
        });
    } catch (error) {
        next(error);
    }
};

const router = express.Router();

// Allow public access to prediction, or add `protect` if only users should use it
router.post('/', predictPrice);

export default router;
