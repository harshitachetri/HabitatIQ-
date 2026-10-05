import sys
import joblib
import os
import pandas as pd

def load_pipeline():
    model_path = os.path.join(os.path.dirname(__file__), 'model_v2.pkl')
    if not os.path.exists(model_path):
        print(f"Error: Pipeline not found at {model_path}. Run train.py first.")
        sys.exit(1)
    return joblib.load(model_path)

def predict(area, bedrooms, bathrooms, age, state, city, locality, property_type):
    pipeline = load_pipeline()
    
    # Input data as a DataFrame for the pipeline
    input_data = pd.DataFrame([{
        'area': float(area),
        'bedrooms': int(bedrooms),
        'bathrooms': int(bathrooms),
        'age': int(age),
        'state': str(state),
        'city': str(city),
        'locality': str(locality),
        'property_type': str(property_type)
    }])
    
    prediction = pipeline.predict(input_data)[0]
    return prediction

if __name__ == "__main__":
    if len(sys.argv) > 1:
        # Example usage: python predict.py 1500 3 2 10 "New York" "Manhattan" "Downtown" "Apartment"
        try:
            area, bedrooms, bathrooms, age = sys.argv[1:5]
            state, city, locality, property_type = sys.argv[5:9]
            price = predict(area, bedrooms, bathrooms, age, state, city, locality, property_type)
            print(f"Predicted price: ${price:,.2f}")
        except Exception as e:
            print(f"Error during prediction: {e}")
            print("Usage: python predict.py <area> <bedrooms> <bathrooms> <age> <state> <city> <locality> <property_type>")
    else:
        # If no arguments, use default values for demonstration
        print("Using default values for demonstration...")
        price = predict(2500, 4, 3, 5, "California", "Los Angeles", "Coastal", "House")
        print(f"Default prediction (California, LA, Coastal House, 2500 sqft): ${price:,.2f}")
