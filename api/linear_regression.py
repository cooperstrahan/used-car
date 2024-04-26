import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder


# data preprocessing and model training
dtype = {
    'names': ('Car_ID', 'Brand', 'Model', 'Year', 'Kilometers_Driven', 'Fuel_Type', 'Transmission', 'Owner_Type', 'Mileage', 'Engine', 'Power', 'Seats', 'Price'),
    'formats': ('i4', '<U10', '<U20', 'i4', 'i4', '<U10', '<U10', '<U10', 'i4', 'i4', 'i4', 'i4', 'i4')
}

CD = np.loadtxt(fname='../cars.csv', 
                dtype=dtype,
                delimiter=',',
                skiprows=1)

X_tup = CD[['Car_ID', 'Brand', 'Model', 'Year', 'Kilometers_Driven', 'Fuel_Type', 'Transmission', 'Owner_Type', 'Mileage', 'Engine', 'Power', 'Seats']]
X_tup_np = np.array([list(item) for item in X_tup])
# Assuming 'Brand', 'Model', 'Fuel_Type', 'Transmission', and 'Owner_Type' are categorical features
categorical_features = ['Brand', 'Model', 'Fuel_Type', 'Transmission', 'Owner_Type']
categorical_indices = [X_tup.dtype.names.index(feature) for feature in categorical_features]

encoder = OneHotEncoder(sparse_output=False)

X_categorical_encoded = encoder.fit_transform(X_tup_np[:, categorical_indices])

numerical_features_indices = [X_tup.dtype.names.index(feature) for feature in X_tup.dtype.names if feature not in categorical_features]
X_numerical = X_tup_np[:, numerical_features_indices]

X_final = np.concatenate((X_categorical_encoded, X_numerical), axis=1)

# Convert non-categorical columns to float
X_final_float = X_final.astype(float)

# Convert float columns to integers
X_final_int = X_final_float.astype(int)

Y = CD['Price']

X_train = X_final_int[:-25]
X_test = X_final_int[-25:]

Y_train = Y[:-25]
Y_test = Y[-25:]


regr = LinearRegression()

regr.fit(X_train, Y_train)

Y_pred = regr.predict(X_test)

# The coefficients
# print("Coefficients: \n", regr.coef_)
# The mean squared error
# print("Mean squared error: %.2f" % mean_squared_error(Y_test, Y_pred))
# The coefficient of determination: 1 is perfect prediction
# print("Coefficient of determination: %.2f" % r2_score(Y_test, Y_pred))


# To allow users to enter vehicle information and get a predicted price for their random vehicle, you can create a function that takes input from the user, preprocesses the input data in the same way as your training data, and then uses the trained linear regression model to make predictions. Here's how you can do it:

# python

def predict_car_price(brand, model, year, kilometers_driven, fuel_type, transmission, owner_type, mileage, engine, power, seats):
    # Prepare input data
    input_data = np.array([[101, brand, model, year, kilometers_driven, fuel_type, transmission, owner_type, mileage, engine, power, seats]])
    
    # One-hot encode categorical features
    input_categorical_encoded = encoder.transform(input_data[:, categorical_indices])
    
    # Concatenate encoded categorical features with numerical features
    input_numerical = input_data[:, numerical_features_indices]
    input_final = np.concatenate((input_categorical_encoded, input_numerical), axis=1)
    
    # Convert input data to float and then to integers
    input_final_float = input_final.astype(float)
    input_final_int = input_final_float.astype(int)
    
    # Make prediction
    predicted_price = regr.predict(input_final_int)
    
    return predicted_price[0]

# Example usage
# predicted_price = predict_car_price('Toyota', 'Corolla', 2018, 50000, 'Petrol', 'Manual', 'First', 15, 1498, 108, 5)
# print("Predicted price:", predicted_price)