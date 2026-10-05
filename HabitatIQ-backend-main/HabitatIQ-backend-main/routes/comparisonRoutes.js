import express from 'express';
import {
    addPropertyToCompare,
    getComparedProperties,
    removeComparedProperty,
} from '../controllers/comparisonController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, addPropertyToCompare)
    .get(protect, getComparedProperties);

router.route('/:propertyId')
    .delete(protect, removeComparedProperty);

export default router;
