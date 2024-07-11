# used-car

Building a Web App for Predicting the Price of a Used Car based on the used car dataset available on Kaggle

To run this web application open two terminal windows

## Backend

```
cd backend
```

Make sure you have installed all of the dependencies

Either

```
pip3 install -r requirements.txt
```

or (if that isn't working for you)

```
pip3 install flask
pip3 install flask-cors
pip3 install numpy
pip3 install scikit-learn
```

To run the backend

```
python3 -m flask --app used_car_api run
```

## Frontend

```
cd frontend
yarn install
yarn start
```

You should then be able to view this running application at
http://localhost:3000/

Hope you have fun with this simple linear regression application!

Please do not use any of this information for car purchasing this was built in a
few hours purely for learning scikit-learn purposes.
