const carModel = require('../models/carModel');

exports.createCar = (req, res) => {
    const { marca, modelo, placa, preco } = req.body;

    if (!marca || !modelo || !placa || !preco) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const newCar = carModel.createCar({ marca, modelo, placa, preco });
    res.status(201).json(newCar);
};

exports.getAllCars = (req, res) => {
    const cars = carModel.getAllCars();

    res.status(200).json(cars);
};

exports.getCarById = (req, res) => {
    const car = carModel.getCarById(parseInt(req.params.id, 10));

    if (!car) {
        return res.status(404).json({ message: 'Carro não encontrado.' });
    }

    res.status(200).json(car);
};

exports.updateCar = (req, res) => {
    const updatedCar = carModel.updateCar(parseInt(req.params.id, 10), req.body);

    if (!updatedCar) {
        return res.status(404).json({ message: 'Carro não encontrado.' });
    }

    res.status(200).json(updatedCar);
};

exports.deleteCar = (req, res) => {
    const deletedCar = carModel.deleteCar(parseInt(req.params.id, 10));

    if (!deletedCar) {
        return res.status(404).json({ message: 'Carro não encontrado.' });
    }

    res.status(200).json(deletedCar);
};