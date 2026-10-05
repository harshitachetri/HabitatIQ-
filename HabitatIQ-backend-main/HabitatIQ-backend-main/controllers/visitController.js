import VisitRequest from '../models/VisitRequest.js';
import Property from '../models/Property.js';

// @desc    Request a property visit
// @route   POST /api/visits/request
// @access  Private/Buyer
export const requestVisit = async (req, res, next) => {
    try {
        const { propertyId, visitDate, visitTime } = req.body;

        const property = await Property.findById(propertyId);

        if (!property) {
            res.status(404);
            throw new Error('Property not found');
        }

        const visit = await VisitRequest.create({
            propertyId,
            buyerId: req.user._id,
            ownerId: property.owner,
            visitDate,
            visitTime,
            status: 'pending',
        });

        res.status(201).json(visit);
    } catch (error) {
        next(error);
    }
};

// @desc    Get user's visit requests (as a buyer)
// @route   GET /api/visits/my-requests
// @access  Private
export const getMyRequests = async (req, res, next) => {
    try {
        const visits = await VisitRequest.find({ buyerId: req.user._id }).populate('propertyId', 'title city state locality price images');
        res.json(visits);
    } catch (error) {
        next(error);
    }
};

// @desc    Owner view visit requests for their properties
// @route   GET /api/visits/owner
// @access  Private/Seller
export const getOwnerRequests = async (req, res, next) => {
    try {
        const visits = await VisitRequest.find({ ownerId: req.user._id })
            .populate('propertyId', 'title city state locality')
            .populate('buyerId', 'name email phone');
            
        res.json(visits);
    } catch (error) {
        next(error);
    }
};

// @desc    Approve or reject visit request
// @route   PUT /api/visits/:id/status
// @access  Private/Seller
export const updateVisitStatus = async (req, res, next) => {
    try {
        const { status } = req.body; // 'approved' or 'rejected'

        const visit = await VisitRequest.findById(req.params.id);

        if (visit) {
            // Verify ownership
            if (visit.ownerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                res.status(401);
                throw new Error('Not authorized to update this visit');
            }

            visit.status = status;
            const updatedVisit = await visit.save();
            res.json(updatedVisit);
        } else {
            res.status(404);
            throw new Error('Visit request not found');
        }
    } catch (error) {
        next(error);
    }
};
