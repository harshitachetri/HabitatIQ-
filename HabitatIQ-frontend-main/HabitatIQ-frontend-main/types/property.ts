import { User } from './user';

export interface Location {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
}

export interface Property {
    _id: string;
    title: string;
    description: string;
    propertyType: 'apartment' | 'house' | 'villa' | 'plot';
    price: number;
    bedrooms: number;
    bathrooms: number;
    areaSqft: number;
    furnishingStatus?: 'unfurnished' | 'semi-furnished' | 'fully-furnished';
    constructionStatus?: 'under-construction' | 'ready-to-move';
    state: string;
    city: string;
    locality: string;
    latitude?: number;
    longitude?: number;
    virtualTourUrl?: string;
    owner: User | string;
    images: string[];
    createdAt?: string;
    updatedAt?: string;
}

// Backend VisitRequest model fields: propertyId, buyerId, ownerId, visitDate, visitTime, status
export interface VisitRequest {
    _id: string;
    propertyId: Property | string;
    buyerId: User | string;
    ownerId: User | string;
    visitDate: string;
    visitTime: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt?: string;
    updatedAt?: string;
}

// Backend SavedProperty model fields: userId, propertyId (populated)
export interface SavedItem {
    _id: string;
    userId: string;
    propertyId: Property | string;
    createdAt?: string;
}

// Backend Comparison model fields: userId, propertyId (populated)
export interface CompareItem {
    _id: string;
    userId: string;
    propertyId: Property | string;
    createdAt?: string;
}

// Backend investment analysis response: annualROI, fiveYearROI, investmentScore, purchasePrice, estimatedRent, appreciationRate
export interface InvestmentAnalysis {
    purchasePrice: number;
    estimatedRent: number;
    appreciationRate: number;
    annualROI: number;
    fiveYearROI: number;
    investmentScore: number;
}

// Backend price prediction response
export interface PricePrediction {
    predictedPrice: number;
    confidenceScore: number;
    details: {
        sizeEfficiency: number;
        locationMultiplier: number;
        bedroomFactor: number;
        bathroomFactor: number;
    };
}
