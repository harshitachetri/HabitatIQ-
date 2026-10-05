export const getLocationMultiplier = (state, city, locality) => {
    // In a real application, this would query a database of historical prices
    // or call an external ML model. Here we mock it with sensible defaults per city.
    
    let multiplier = 1.0;
    const cityLower = city.toLowerCase();
    
    const cityMultipliers = {
        'mumbai': 2.5,
        'delhi': 2.0,
        'bangalore': 1.8,
        'hyderabad': 1.6,
        'pune': 1.5,
        'chennai': 1.4,
        'kolkata': 1.2,
        'noida': 1.3,
        'gurgaon': 1.7,
    };
    
    if (cityMultipliers[cityLower]) {
        multiplier *= cityMultipliers[cityLower];
    }
    
    // Add some random variation for locality to simulate different neighborhoods 
    // Usually handled by a trained ML model
    const localityHash = locality.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const localityBump = (localityHash % 20) / 100; // 0 to 0.19 variation
    
    return multiplier + localityBump;
};

export const getPropertyTypeBasePrice = (propertyType) => {
    const types = {
        'apartment': 5000,
        'villa': 8000,
        'house': 6000,
        'plot': 3000
    };
    return types[propertyType] || 4000;
};
