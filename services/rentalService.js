const rentalModel = require('../models/rentalModel');

// Realiza as chamadas declaradas no rentalModel
exports.getAllRentalsPaginated = (limit, page) => {
    const validLimits = [5, 10, 30];
    if (!validLimits.includes(limit)) {
        throw new Error(`Limite inválido. Valores permitidos: ${validLimits.join(', ')}`);
    }

    const rentals = rentalModel.getAllRentals();
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return rentals.slice(startIndex, endIndex);
};

exports.getRentalById = (id) => rentalModel.getRentalById(id);

exports.createRental = (rental) => rentalModel.createRental(rental);

exports.updateRental = (id, updatedRental) => rentalModel.updateRental(id, updatedRental);

exports.deleteRental = (id) => rentalModel.deleteRental(id);