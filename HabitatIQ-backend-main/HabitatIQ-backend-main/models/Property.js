import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        propertyType: {
            type: String,
            enum: ['apartment', 'villa', 'plot', 'house'],
            required: true,
        },
        bedrooms: {
            type: Number,
            required: true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        areaSqft: {
            type: Number,
            required: true,
        },
        furnishingStatus: {
            type: String,
            enum: ['unfurnished', 'semi-furnished', 'fully-furnished'],
            default: 'unfurnished',
        },
        constructionStatus: {
            type: String,
            enum: ['under-construction', 'ready-to-move'],
            default: 'ready-to-move',
        },
        state: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        locality: {
            type: String,
            required: true,
        },
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        virtualTourUrl: {
            type: String,
        },
        images: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Indexes for popular filters
propertySchema.index({ city: 1, locality: 1 });
propertySchema.index({ price: 1 });
propertySchema.index({ propertyType: 1 });

const Property = mongoose.model('Property', propertySchema);

export default Property;
