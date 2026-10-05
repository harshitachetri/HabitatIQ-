import express from 'express';
import { shareProperty } from '../controllers/shareController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:propertyId', protect, shareProperty);

export default router;
