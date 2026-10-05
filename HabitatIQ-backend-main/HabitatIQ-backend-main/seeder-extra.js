import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Property from './models/Property.js';

dotenv.config();
connectDB();

const extraUsers = [
    {
        name: 'Karan Malhotra',
        email: 'karan.m@example.com',
        password: 'password123',
        phone: '9876543111',
        role: 'buyer'
    },
    {
        name: 'Sonia Desai',
        email: 'sonia.d@example.com',
        password: 'password123',
        phone: '9876543112',
        role: 'buyer'
    },
    {
        name: 'Rohit Verma',
        email: 'rohit.v@example.com',
        password: 'password123',
        phone: '9876543113',
        role: 'seller'
    },
    {
        name: 'Anita Kapoor',
        email: 'anita.k@example.com',
        password: 'password123',
        phone: '9876543114',
        role: 'seller'
    }
];

const extraProperties = (users) => [
    {
        title: 'Boutique Office Space in BKC',
        description: 'Fully furnished premium office space in the heart of Mumbai’s commercial hub. Perfect for startups or boutique firms.',
        price: 85000000,
        propertyType: 'apartment',
        bedrooms: 0,
        bathrooms: 2,
        areaSqft: 1500,
        furnishingStatus: 'fully-furnished',
        constructionStatus: 'ready-to-move',
        state: 'Maharashtra',
        city: 'Mumbai',
        locality: 'Bandra Kurla Complex',
        latitude: 19.0656,
        longitude: 72.8646,
        owner: users[2]._id, // Rohit
        images: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1497215898147-5bf587114675?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        title: 'Luxurious Golf Course Villa in Gurgaon',
        description: 'Massive villa overlooking the golf course in DLF Phase 5. Features private pool, home theater, and sprawling gardens.',
        price: 250000000,
        propertyType: 'villa',
        bedrooms: 6,
        bathrooms: 7,
        areaSqft: 8500,
        furnishingStatus: 'fully-furnished',
        constructionStatus: 'ready-to-move',
        state: 'Haryana',
        city: 'Gurgaon',
        locality: 'DLF Phase 5',
        latitude: 28.4604,
        longitude: 77.0982,
        owner: users[3]._id, // Anita
        images: [
            'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1600607687931-cebf66711515?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        title: 'Cozy 2BHK Near Manyata Tech Park',
        description: 'Perfect for IT professionals, this cozy apartment offers great connectivity, modern amenities, and a peaceful environment.',
        price: 8500000,
        propertyType: 'apartment',
        bedrooms: 2,
        bathrooms: 2,
        areaSqft: 1100,
        furnishingStatus: 'semi-furnished',
        constructionStatus: 'ready-to-move',
        state: 'Karnataka',
        city: 'Bangalore',
        locality: 'Hebbal',
        latitude: 13.0354,
        longitude: 77.5988,
        owner: users[2]._id, // Rohit
        images: [
            'https://images.unsplash.com/photo-1502672260266-1c1de2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        title: 'Retail Space in Connaught Place',
        description: 'High-visibility storefront in the most iconic shopping destination of New Delhi.',
        price: 450000000,
        propertyType: 'apartment',
        bedrooms: 0,
        bathrooms: 1,
        areaSqft: 800,
        furnishingStatus: 'unfurnished',
        constructionStatus: 'ready-to-move',
        state: 'Delhi',
        city: 'New Delhi',
        locality: 'Connaught Place',
        latitude: 28.6304,
        longitude: 77.2177,
        owner: users[3]._id, // Anita
        images: [
            'https://images.unsplash.com/photo-1582035272633-8abfe45ec640?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1580137189272-c9379f8864fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ]
    }
];

const appendData = async () => {
    try {
        const emails = extraUsers.map(u => u.email);
        await User.deleteMany({ email: { $in: emails } });

        const createdUsers = [];
        for (const user of extraUsers) {
            createdUsers.push(await User.create(user));
        }
        
        const newProps = extraProperties(createdUsers);
        await Property.deleteMany({ title: { $in: newProps.map(p => p.title) } });
        await Property.insertMany(newProps);

        console.log(`Successfully appended ${createdUsers.length} new users and ${newProps.length} new properties to the database!`);
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

appendData();
