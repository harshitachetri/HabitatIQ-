import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema(
    {
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
        pincode: {
            type: String,
            required: true,
        },
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

// Add index to speed up location queries
locationSchema.index({ state: 1, city: 1, locality: 1 }, { unique: true });

const Location = mongoose.model('Location', locationSchema);

export default Location;
