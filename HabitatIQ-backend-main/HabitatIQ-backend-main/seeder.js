import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Location from './models/Location.js';
import User from './models/User.js';
import Property from './models/Property.js';

dotenv.config();
connectDB();

const indianLocations = [
    { state: 'Maharashtra', city: 'Mumbai', locality: 'Bandra West', pincode: '400050', latitude: 19.0596, longitude: 72.8295 },
    { state: 'Maharashtra', city: 'Mumbai', locality: 'Andheri East', pincode: '400069', latitude: 19.1136, longitude: 72.8697 },
    { state: 'Maharashtra', city: 'Pune', locality: 'Koregaon Park', pincode: '411001', latitude: 18.5362, longitude: 73.8939 },
    { state: 'Karnataka', city: 'Bangalore', locality: 'Koramangala', pincode: '560034', latitude: 12.9352, longitude: 77.6245 },
    { state: 'Karnataka', city: 'Bangalore', locality: 'Indiranagar', pincode: '560038', latitude: 12.9784, longitude: 77.6408 },
    { state: 'Delhi', city: 'New Delhi', locality: 'Connaught Place', pincode: '110001', latitude: 28.6304, longitude: 77.2177 },
    { state: 'Delhi', city: 'New Delhi', locality: 'Vasant Vihar', pincode: '110057', latitude: 28.5603, longitude: 77.1610 },
    { state: 'Telangana', city: 'Hyderabad', locality: 'Banjara Hills', pincode: '500034', latitude: 17.4156, longitude: 78.4396 },
    { state: 'Telangana', city: 'Hyderabad', locality: 'Jubilee Hills', pincode: '500033', latitude: 17.4326, longitude: 78.4071 },
    { state: 'Tamil Nadu', city: 'Chennai', locality: 'Adyar', pincode: '600020', latitude: 13.0033, longitude: 80.2540 },
    { state: 'West Bengal', city: 'Kolkata', locality: 'Salt Lake City', pincode: '700091', latitude: 22.5869, longitude: 88.4150 },
    { state: 'Haryana', city: 'Gurgaon', locality: 'DLF Phase 5', pincode: '122011', latitude: 28.4604, longitude: 77.0982 },
    { state: 'Uttar Pradesh', city: 'Noida', locality: 'Sector 15', pincode: '201301', latitude: 28.5833, longitude: 77.3150 },
];

const dummyUsers = [
    {
        name: 'Arjun Mehta',
        email: 'arjun.m@example.com',
        password: 'password123',
        phone: '9876543210',
        role: 'seller'
    },
    {
        name: 'Priya Sharma',
        email: 'priya.s@example.com',
        password: 'password123',
        phone: '9876543211',
        role: 'seller'
    },
    {
        name: 'Rajesh Kumar',
        email: 'rajesh.k@example.com',
        password: 'password123',
        phone: '9876543212',
        role: 'seller'
    },
    {
        name: 'Neha Patel',
        email: 'neha.p@example.com',
        password: 'password123',
        phone: '9876543213',
        role: 'seller'
    },
    {
        name: 'Vikram Singh',
        email: 'vikram.s@example.com',
        password: 'password123',
        phone: '9876543214',
        role: 'seller'
    }
];

const mockProperties = (users) => [
    {
        title: 'Sea Facing Apartment in Bandra',
        description: 'Luxurious 3 BHK apartment with unobstructed sea views, private balcony, and premium amenities. Ideal for families looking for comfort and elegance.',
        price: 45000000,
        propertyType: 'apartment',
        bedrooms: 3,
        bathrooms: 3,
        areaSqft: 1800,
        furnishingStatus: 'fully-furnished',
        constructionStatus: 'ready-to-move',
        state: 'Maharashtra',
        city: 'Mumbai',
        locality: 'Bandra West',
        latitude: 19.0596,
        longitude: 72.8295,
        owner: users[0]._id, // Arjun
        images: [
            'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1502672260266-1c1de2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        title: 'Modern Studio in Andheri',
        description: 'Compact yet extremely well-designed studio apartment perfect for young professionals. Close to metro and tech parks.',
        price: 12000000,
        propertyType: 'apartment',
        bedrooms: 1,
        bathrooms: 1,
        areaSqft: 500,
        furnishingStatus: 'semi-furnished',
        constructionStatus: 'ready-to-move',
        state: 'Maharashtra',
        city: 'Mumbai',
        locality: 'Andheri East',
        latitude: 19.1136,
        longitude: 72.8697,
        owner: users[0]._id, // Arjun
        images: [
            'https://images.unsplash.com/photo-1628592102751-ba83b0314276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        title: 'Heritage Villa in Koregaon Park',
        description: 'Exquisite heritage-style luxury villa with a massive private garden, swimming pool, and dedicated staff quarters.',
        price: 85000000,
        propertyType: 'villa',
        bedrooms: 5,
        bathrooms: 6,
        areaSqft: 4500,
        furnishingStatus: 'fully-furnished',
        constructionStatus: 'ready-to-move',
        state: 'Maharashtra',
        city: 'Pune',
        locality: 'Koregaon Park',
        latitude: 18.5362,
        longitude: 73.8939,
        owner: users[1]._id, // Priya
        images: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1600607687931-cebf66711515?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        title: 'Premium Penthouse in Koramangala',
        description: 'Top-floor penthouse with huge terrace and city view. Features smart home automation and private jacuzzi.',
        price: 60000000,
        propertyType: 'apartment',
        bedrooms: 4,
        bathrooms: 4,
        areaSqft: 3200,
        furnishingStatus: 'fully-furnished',
        constructionStatus: 'ready-to-move',
        state: 'Karnataka',
        city: 'Bangalore',
        locality: 'Koramangala',
        latitude: 12.9352,
        longitude: 77.6245,
        owner: users[2]._id, // Rajesh
        images: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        title: 'Peaceful Independent House in Indiranagar',
        description: 'A quiet and peaceful independent house surrounded by trees in the heart of Bangalore. Close to famous cafes and hubs.',
        price: 35000000,
        propertyType: 'house',
        bedrooms: 3,
        bathrooms: 2,
        areaSqft: 1800,
        furnishingStatus: 'semi-furnished',
        constructionStatus: 'ready-to-move',
        state: 'Karnataka',
        city: 'Bangalore',
        locality: 'Indiranagar',
        latitude: 12.9784,
        longitude: 77.6408,
        owner: users[2]._id, // Rajesh
        images: [
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        title: 'Luxury Plot in DLF Phase 5',
        description: 'Prime residential plot ready for construction. Elite neighborhood with great infrastructure.',
        price: 90000000,
        propertyType: 'plot',
        bedrooms: 0,
        bathrooms: 0,
        areaSqft: 4500,
        furnishingStatus: 'unfurnished',
        constructionStatus: 'ready-to-move',
        state: 'Haryana',
        city: 'Gurgaon',
        locality: 'DLF Phase 5',
        latitude: 28.4604,
        longitude: 77.0982,
        owner: users[3]._id, // Neha
        images: [
            'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1524813686514-a57563d77865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        title: 'Spacious 4BHK in Jubilee Hills',
        description: 'Premium apartment with marble flooring, custom woodwork, and high-end fixtures.',
        price: 52000000,
        propertyType: 'apartment',
        bedrooms: 4,
        bathrooms: 5,
        areaSqft: 2800,
        furnishingStatus: 'fully-furnished',
        constructionStatus: 'ready-to-move',
        state: 'Telangana',
        city: 'Hyderabad',
        locality: 'Jubilee Hills',
        latitude: 17.4326,
        longitude: 78.4071,
        owner: users[4]._id, // Vikram
        images: [
            'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ]
    }
];

const importData = async () => {
    try {
        await Location.deleteMany();
        await User.deleteMany();
        await Property.deleteMany();

        await Location.insertMany(indianLocations);
        
        const createdUsers = [];
        for (const user of dummyUsers) {
            createdUsers.push(await User.create(user));
        }

        await Property.insertMany(mockProperties(createdUsers));

        console.log('Location, User, and Property Seed Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Location.deleteMany();
        await User.deleteMany();
        await Property.deleteMany();
        
        console.log('Data Destroyed Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
