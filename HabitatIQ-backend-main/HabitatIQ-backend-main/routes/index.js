import express from 'express';
import authRoutes from './authRoutes.js';
import propertyRoutes from './propertyRoutes.js';
import visitRoutes from './visitRoutes.js';
import savedRoutes from './savedRoutes.js';
import comparisonRoutes from './comparisonRoutes.js';
import shareRoutes from './shareRoutes.js';
import predictionRoutes from '../controllers/predictionController.js'; // exported from controller file directly
import investmentRoutes from '../controllers/investmentController.js'; // exported from controller file directly

const mountRoutes = (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/properties', propertyRoutes);
    app.use('/api/visits', visitRoutes);
    // Assuming Saved route is under /api/saved
    app.use('/api/saved', savedRoutes);
    app.use('/api/compare', comparisonRoutes);
    app.use('/api/share', shareRoutes);
    app.use('/api/predict-price', predictionRoutes);
    app.use('/api/investment', investmentRoutes);
};

export default mountRoutes;
