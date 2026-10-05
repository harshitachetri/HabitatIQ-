import express from 'express';
import {
    requestVisit,
    getMyRequests,
    getOwnerRequests,
    updateVisitStatus,
} from '../controllers/visitController.js';
import { protect, seller } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/request', protect, requestVisit);
router.get('/my-requests', protect, getMyRequests);
router.get('/owner', protect, getOwnerRequests);
router.put('/:id/status', protect, updateVisitStatus);

export default router;
