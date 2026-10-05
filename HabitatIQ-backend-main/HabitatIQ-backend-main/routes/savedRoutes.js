import express from 'express';
import {
    saveProperty,
    removeSavedProperty,
    getSavedProperties,
} from '../controllers/savedController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getSavedProperties);

router.route('/:propertyId')
    .post(protect, saveProperty)
    .delete(protect, removeSavedProperty);

export default router;
