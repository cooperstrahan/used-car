from flask import Flask, request, jsonify
from flask_cors import CORS
from linear_regression import predict_car_price

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET', 'POST'])
def hello_flask():
    if request.method == 'POST':
        data = request.json  # assuming JSON data is sent
        # Extract data from the request and pass it to your function
        # For example:
        make = data.get('make')
        model = data.get('model')
        year = data.get('year')
        kilometers = data.get('kilometers')
        fuelType = data.get('fuelType')
        transmission = data.get('transmission')
        owner = data.get('owner')
        mileage = data.get('mileage')
        engine = data.get('engine')
        power = data.get('power')
        seat = data.get('seat')

        price = predict_car_price(make, model, year, kilometers, fuelType, transmission, owner, mileage, engine, power, seat)

        return jsonify({'hello': 'hello flask',
                        'predicted_car_price': price})
    
    price = predict_car_price('Hyundai', 'Corolla', 2018, 50000, 'Petrol', 'Manual', 'First', 15, 1498, 108, 5)

    return {
                'hello': 'hello flask',
                'predicted car price': price
           }

