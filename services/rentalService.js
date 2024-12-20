const rentalModel = require('../models/rentalModel');

// Realiza as chamadas declaradas no rentalModel
exports.getAllRentals = () => rentalModel.getAllRentals();

exports.getRentalById = (id) => rentalModel.getRentalById(id);

exports.createRental = (rental) => rentalModel.createRental(rental);

exports.updateRental = (id, updatedRental) => rentalModel.updateRental(id, updatedRental);

exports.deleteRental = (id) => rentalModel.deleteRental(id);