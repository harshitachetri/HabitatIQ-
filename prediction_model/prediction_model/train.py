import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib
import os

def generate_data(n_samples=2000):
    np.random.seed(42)
    # Features: Area (sqft), Bedrooms, Bathrooms, Age (years)
    area = np.random.randint(500, 5000, n_samples)
    bedrooms = np.random.randint(1, 6, n_samples)
    bathrooms = np.random.randint(1, 4, n_samples)
    age = np.random.randint(0, 50, n_samples)
    
    # Categorical features
    states = ['California', 'Texas', 'Florida', 'New York', 'Washington']
    cities = {
        'California': ['Los Angeles', 'San Francisco', 'San Diego'],
        'Texas': ['Houston', 'Austin', 'Dallas'],
        'Florida': ['Miami', 'Orlando', 'Tampa'],
        'New York': ['Manhattan', 'Brooklyn', 'Queens'],
        'Washington': ['Seattle', 'Bellevue', 'Tacoma']
    }
    localities = ['Downtown', 'Suburban', 'Rural', 'Uptown', 'Coastal']
    property_types = ['Apartment', 'House', 'Condo', 'Townhouse', 'Studio']
    
    state_list = np.random.choice(states, n_samples)
    city_list = [np.random.choice(cities[s]) for s in state_list]
    locality_list = np.random.choice(localities, n_samples)
    property_type_list = np.random.choice(property_types, n_samples)
    
    # Target: Price logic (categorical affects price)
    # Base: area*150 + bedrooms*10000 + bathrooms*5000 - age*500
    state_multiplier = {'California': 1.5, 'Texas': 1.0, 'Florida': 1.2, 'New York': 1.8, 'Washington': 1.3}
    locality_multiplier = {'Downtown': 1.6, 'Suburban': 1.2, 'Rural': 0.7, 'Uptown': 1.4, 'Coastal': 1.5}
    property_multiplier = {'Apartment': 0.9, 'House': 1.2, 'Condo': 1.1, 'Townhouse': 1.0, 'Studio': 0.8}
    
    prices = []
    for i in range(n_samples):
        base_price = 50000 + (area[i] * 150) + (bedrooms[i] * 10000) + (bathrooms[i] * 5000) - (age[i] * 500)
        multiplier = state_multiplier[state_list[i]] * locality_multiplier[locality_list[i]] * property_multiplier[property_type_list[i]]
        noise = np.random.randint(-15000, 15000)
        prices.append(base_price * multiplier + noise)
    
    data = pd.DataFrame({
        'area': area,
        'bedrooms': bedrooms,
        'bathrooms': bathrooms,
        'age': age,
        'state': state_list,
        'city': city_list,
        'locality': locality_list,
        'property_type': property_type_list,
        'price': prices
    })
    return data

def train_model():
    print("Generating synthetic data with categorical features...")
    df = generate_data()
    
    # Feature engineering / Preprocessing
    categorical_features = ['state', 'city', 'locality', 'property_type']
    numeric_features = ['area', 'bedrooms', 'bathrooms', 'age']
    
    X = df[numeric_features + categorical_features]
    y = df['price']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Building pipeline...")
    # Preprocessor for categorical data
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', 'passthrough', numeric_features),
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
        ]
    )
    
    # Full pipeline with preprocessor and regressor
    pipeline = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('regressor', LinearRegression())
    ])
    
    print("Training updated model pipeline...")
    pipeline.fit(X_train, y_train)
    
    score = pipeline.score(X_test, y_test)
    print(f"Model trained. R^2 score: {score:.4f}")
    
    # Save the entire pipeline
    model_path = os.path.join(os.path.dirname(__file__), 'model_v2.pkl')
    joblib.dump(pipeline, model_path)
    print(f"Pipeline saved to {model_path}")

if __name__ == "__main__":
    train_model()
