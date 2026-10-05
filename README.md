# 🏠 HabitatIQ

### Intelligent Real Estate Platform for India with AI-Powered Price Prediction

HabitatIQ is a full-stack real estate platform designed specifically for the Indian property market. It allows users to discover properties, filter listings based on their requirements, publish and manage property listings, and estimate property prices using an AI-powered prediction system.

The platform combines **real estate listings, location-based search, authentication, AI-assisted price prediction, and investment analysis** into a single application.

---

## 🚀 Features

### 🔐 User Authentication

* User registration and login
* Email/password authentication
* JWT-based authentication
* Protected routes
* Secure access to user-specific operations

### 🏘️ Property Listings

* Browse available properties
* Add new property listings
* Edit existing listings
* Delete property listings
* Property details page
* Support for up to 4 property images
* Property type and bedroom-based filtering

### 🔎 Advanced Property Search

Users can filter properties using:

* State
* City
* Locality
* Property type
* Price range
* Number of bedrooms

HabitatIQ follows a hierarchical location structure:

```text
State
 └── City
      └── Locality
```

The platform also supports **GPS-based location detection** through the "Use My Location" functionality.

### 🤖 AI-Powered Price Prediction

HabitatIQ provides an estimated property price using multiple property and location parameters.

The prediction system considers factors such as:

* State
* City
* Locality
* Property type
* Property size
* Number of bedrooms
* Number of bathrooms
* Size-efficiency factors
* Location-based price multipliers

The system also provides a **confidence score** for the estimated price.

### 📈 ROI Calculator

The built-in investment calculator helps users evaluate potential property investments.

It provides:

* 5-year investment projection
* Expected property appreciation
* Rental yield estimation
* Investment score
* Projected future property value

This helps users compare properties not only by their current price but also by their potential investment value.

---

## 🧠 How the Price Prediction Works

The price prediction system combines location and property-specific factors to calculate an estimated property value.

A simplified representation of the process is:

```text
Property Information
        │
        ├── Location
        │    ├── State
        │    ├── City
        │    └── Locality
        │
        ├── Property Type
        ├── Area / Size
        ├── Bedrooms
        └── Bathrooms
                │
                ▼
       Price Calculation Engine
                │
                ▼
      Location & Property Factors
                │
                ▼
       Estimated Property Price
                │
                ▼
        Confidence Score
```

The system is designed to provide practical price estimates based on the available property data rather than relying solely on a generic average price.

---

## 🏗️ Technology Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* REST APIs
* JWT Authentication

### Database

* MongoDB
* MongoDB Atlas

### AI / Prediction

* Location-based price factors
* Property-specific prediction logic
* Confidence scoring

### Development & Deployment

* Git
* GitHub
* REST API architecture
* Render

---

## 📂 Project Architecture

The application follows a client-server architecture:

```text
                    ┌──────────────────────┐
                    │      User / Client   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │                      │
                    │ • Authentication     │
                    │ • Property Search    │
                    │ • Property Details   │
                    │ • Price Prediction   │
                    │ • ROI Calculator     │
                    └──────────┬───────────┘
                               │
                         REST API / JWT
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Express Backend    │
                    │                      │
                    │ • Auth APIs          │
                    │ • Property APIs      │
                    │ • Prediction Logic   │
                    │ • User Management    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       MongoDB        │
                    │      Database        │
                    └──────────────────────┘
```

---

## 🗃️ Property Data

The project includes sample property data covering multiple regions of India.

The current dataset contains approximately:

* **27 properties**
* **15 Indian states**
* Multiple cities and localities
* Different property types
* Different price ranges
* Different bedroom configurations

This provides a diverse dataset for demonstrating property search and price prediction functionality.

---

## 🔑 Authentication Flow

HabitatIQ uses JWT-based authentication.

```text
User
 │
 ▼
Register / Login
 │
 ▼
Backend Authentication API
 │
 ▼
Credentials Validation
 │
 ▼
JWT Token Generated
 │
 ▼
Authenticated Requests
 │
 ▼
Protected API Routes
```

Protected operations include actions such as creating, updating, and deleting property listings.

---

## 📡 API Overview

The backend exposes RESTful APIs for the major application features.

Typical API modules include:

```text
/api/auth
/api/properties
/api/users
```

Authentication endpoints handle:

* User registration
* User login
* Authentication validation

Property endpoints handle:

* Fetching properties
* Creating properties
* Updating properties
* Deleting properties
* Fetching individual property details

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/harshitachetri/HabitAiIQ.git
cd HabitAiIQ
```

### 2. Install Dependencies

Install dependencies for the frontend and backend according to the project structure.

For example:

```bash
npm install
```

If frontend and backend are separate applications:

```bash
cd frontend
npm install
```

and:

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the backend directory.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do **not** commit `.env` files or database credentials to GitHub.

### 4. Start the Backend

```bash
npm run dev
```

The backend should start on:

```text
http://localhost:5000
```

### 5. Start the Frontend

From the frontend directory:

```bash
npm run dev
```

The frontend will then be available through the development server URL shown in the terminal.

---

## 🌍 Location-Based Search

HabitatIQ uses a structured Indian location hierarchy:

```text
India
 │
 ├── State
 │    │
 │    ├── City
 │    │    │
 │    │    └── Locality
 │    │
 │    └── ...
 │
 └── ...
```

Users can narrow their property search from a broad state-level search down to a specific locality.

The application can also use the user's GPS location to assist with location-based property discovery.

---

## 📊 Investment Analysis

The ROI calculator provides users with a simplified method of evaluating a property investment.

### Example calculation flow

```text
Current Property Price
          │
          ▼
Expected Appreciation
          │
          ▼
5-Year Projection
          │
          ├── Future Property Value
          │
          ├── Rental Yield
          │
          └── Investment Score
```

This allows buyers to understand both the **current property value** and its potential long-term investment performance.

---

## 🛡️ Security

The application implements several security practices:

* JWT-based authentication
* Protected backend routes
* Environment variables for secrets
* Password authentication
* Authenticated property management
* Server-side API validation

Sensitive credentials such as MongoDB connection strings and JWT secrets should always be stored in environment variables.

---

## 🔮 Future Improvements

Potential improvements for future versions include:

* [ ] Real-time property market data
* [ ] More advanced ML-based price prediction
* [ ] Larger property dataset
* [ ] User reviews and ratings
* [ ] Property comparison
* [ ] Saved / favourite properties
* [ ] Property recommendation system
* [ ] Google Maps integration
* [ ] Mortgage / EMI calculator
* [ ] Advanced investment analytics
* [ ] Admin dashboard
* [ ] Property verification system
* [ ] Real-time notifications
* [ ] Cloud-based image storage
* [ ] Automated CI/CD deployment

---

## 🎯 Project Objectives

The main objectives of HabitatIQ are:

1. Build a centralized platform for discovering Indian real estate properties.
2. Simplify property searching using location and property filters.
3. Provide AI-assisted property price estimation.
4. Help users evaluate potential real estate investments.
5. Provide secure user authentication and property management.
6. Demonstrate the integration of a modern full-stack web application with AI-driven functionality.

---

## 📸 Application Modules

The application consists of the following major modules:

| Module            | Description                                      |
| ----------------- | ------------------------------------------------ |
| Authentication    | Registration, login and JWT authentication       |
| Property Listings | Create, view, edit and delete properties         |
| Search & Filters  | Search properties by location and specifications |
| Property Details  | Detailed property information and images         |
| Price Prediction  | Estimated property price and confidence score    |
| ROI Calculator    | Five-year investment projection                  |
| Location System   | State → City → Locality hierarchy                |
| User Management   | Authenticated user operations                    |

B.Tech
LinkedIn:
https://www.linkedin.com/in/harshita-chetri-967794319

-## 📜 License

This project is developed for educational and academic purposes.

You may modify and extend the project for learning and development purposes.
