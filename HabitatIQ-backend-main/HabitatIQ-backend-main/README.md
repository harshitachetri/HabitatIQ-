# HabitatIQ Backend

## What the Project Is
HabitatIQ Backend is a Node.js and Express RESTful API built for a comprehensive real estate platform. Its purpose is to manage properties, authenticate users, facilitate property comparison, predictive pricing, and investment analysis. The system interacts with a MongoDB database using Mongoose to persist user and real estate data seamlessly.

## Key Features

- **Authentication & Authorization**: Secure user registration, login, and protected routes using JSON Web Tokens (JWT) and Bcrypt for password hashing.
- **Property Management**: Complete CRUD capabilities for properties and property images, supporting extensive details such as location and pricing.
- **Property Discovery**: Browsing features and sophisticated filtering. 
- **Saved Properties**: Allows users to wishlist properties for their accounts.
- **Comparison Engine**: Tools to compare multiple properties side-by-side using specified metrics.
- **Price Prediction**: Forecasting property prices leveraging analytical data (served via the backend controller).
- **Investment Analysis**: Advanced analysis calculations mapping property values over time to help users make calculated decisions.
- **Visit Scheduling**: Enables prospective buyers or tenants to schedule property visits directly.
- **Property Sharing**: Social and link-sharing functionalities for properties.

## Tech Stack
- **Node.js & Express**: Core server framework.
- **MongoDB & Mongoose**: NoSQL Database management and object modeling.
- **JWT & Bcrypt**: For secure, stateless user authentication and password encryption.
- **CORS**: Configured for cross-origin requests from the React/Next.js frontend.
- **Dotenv**: Environment variable management.

## API Endpoints

### Authentication `/api/auth`
- `POST /register` - Register a new user
- `POST /login` - Authenticate a user and get token
- `GET /me` - Get current user profile (Private)

### Properties `/api/properties`
- `GET /` - Get all properties
- `GET /:id` - Get a single property
- `POST /` - Create a new property (Private, Seller)
- `PUT /:id` - Update a property (Private, Seller)
- `DELETE /:id` - Delete a property (Private, Seller)
- `GET /:id/images` - Get images for a property
- `POST /:id/images` - Upload images for a property (Private, Seller)

### Visits `/api/visits`
- `POST /request` - Request a property visit (Private)
- `GET /my-requests` - Get visit requests made by user (Private)
- `GET /owner` - Get visit requests on user's properties (Private, Seller)
- `PUT /:id/status` - Update a visit request status (Private, Seller)

### Saved Properties `/api/saved`
- `GET /` - Get user's saved properties (Private)
- `POST /:propertyId` - Save a property (Private)
- `DELETE /:propertyId` - Remove a saved property (Private)

### Comparison `/api/compare`
- `GET /` - Get properties in user's comparison list (Private)
- `POST /` - Add a property to compare list (Private)
- `DELETE /:propertyId` - Remove from compare list (Private)

### Price Prediction `/api/predict-price`
- `POST /` - Predict property price based on parameters

### Investment Analysis `/api/investment`
- `POST /analyze` - Calculate ROI and investment potential

### Share `/api/share`
- `POST /:propertyId` - Share a property (Private)

## Project Structure

```text
├── config/              # Database configuration (db.js)
├── controllers/         # Request handling logic (e.g., auth, property, comparison)
├── middleware/          # Express middleware (auth protection, error handling)
├── models/              # Mongoose data schemas (User, Property, Comparison, Location, etc.)
├── routes/              # Express API route endpoints definitions
├── services/            # Reusable core services logic 
├── utils/               # Helper and utility functions
├── app.js               # Express application initialization and middleware mounting
├── server.js            # Node HTTP server entry point
└── seeder.js            # Script used to seed the database with mock data
```
