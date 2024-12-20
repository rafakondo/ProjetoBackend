const carModel = require('../models/carModel');

// Realiza as chamadas declaradas no carModel
exports.getAllCars = () => carModel.getAllCars();

exports.getCarById = (id) => carModel.getCarById(id);

exports.createCar = (car) => carModel.createCar(car);

exports.updateCar = (id, updatedCar) => carModel.updateCar(id, updatedCar);

exports.deleteCar = (id) => carModel.deleteCar(id);