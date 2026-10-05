export const calculateROI = (purchasePrice, estimatedRent, appreciationRate) => {
    // Annual Rental Income
    const annualRent = estimatedRent * 12;
    
    // Annual Rental Yield (%)
    const rentalYield = (annualRent / purchasePrice) * 100;

    // Total Annual ROI (Yield + Appreciation)
    const annualROI = rentalYield + appreciationRate;

    // 5 Year ROI with compounding appreciation
    let futureValue = purchasePrice;
    for (let i = 0; i < 5; i++) {
        futureValue += (futureValue * (appreciationRate / 100));
    }
    const totalRent5Years = annualRent * 5; // Simplified (no rent increment)
    
    const futureTotalValue = futureValue + totalRent5Years;
    const fiveYearROI = ((futureTotalValue - purchasePrice) / purchasePrice) * 100;

    // Calculate Investment Score out of 100
    // Based loosely on: >8% annual ROI is good in India real estate
    let investmentScore = Math.min((annualROI / 12) * 100, 100);

    return {
        annualROI: parseFloat(annualROI.toFixed(2)),
        fiveYearROI: parseFloat(fiveYearROI.toFixed(2)),
        investmentScore: Math.round(investmentScore)
    };
};
