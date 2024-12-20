const carModel = require('../models/carModel');

// Realiza as chamadas declaradas no carModel
exports.getAllCarsPaginated = (limit, page) => {
    const validLimits = [5, 10, 30];
    if (!validLimits.includes(limit)) {
        throw new Error(`Limite inválido. Valores permitidos: ${validLimits.join(', ')}`);
    }

    const cars = carModel.getAllCars();
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return cars.slice(startIndex, endIndex);
};

exports.getCarById = (id) => carModel.getCarById(id);

exports.createCar = (car) => carModel.createCar(car);

exports.updateCar = (id, updatedCar) => carModel.updateCar(id, updatedCar);

exports.deleteCar = (id) => carModel.deleteCar(id);