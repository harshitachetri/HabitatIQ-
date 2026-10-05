import { getLocationMultiplier, getPropertyTypeBasePrice } from '../utils/locationMultiplier.js';

export const calculatePricePrediction = (data) => {
    const { state, city, locality, areaSqft, bedrooms, bathrooms, propertyType } = data;

    const basePricePerSqft = getPropertyTypeBasePrice(propertyType);
    const locationMultiplier = getLocationMultiplier(state, city, locality);
    
    // Diminishing returns on extra bedrooms/bathrooms
    const bedroomFactor = 1 + (bedrooms * 0.05);
    const bathroomFactor = 1 + (bathrooms * 0.03);
    
    const predictedPrice = Math.round(
        basePricePerSqft * 
        areaSqft * 
        locationMultiplier * 
        bedroomFactor * 
        bathroomFactor
    );

    // Mocking confidence score based on data completeness
    let confidenceScore = 85;
    if (areaSqft && bedrooms && city) {
        confidenceScore += 10;
    }

    // Size efficiency: Ratio of bedrooms to total area (mock calculation)
    const sizeEfficiency = areaSqft / (bedrooms || 1);

    return {
        predictedPrice,
        confidenceScore: Math.min(confidenceScore, 98), // Cap at 98%
        sizeEfficiency,
        locationMultiplier,
        bedroomFactor,
        bathroomFactor
    };
};
