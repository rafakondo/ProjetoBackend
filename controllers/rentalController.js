const rentalModel = require('../models/rentalModel');

exports.createRental = (req, res) => {
    const { idCarro, idUser } = req.body;

    if (!idCarro || !idUser) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const newRental = rentalModel.createRental({ idCarro, idUser });
    res.status(201).json(newRental);
};

exports.getAllRentals = (req, res) => {
    const rentals = req.user.isAdmin
        ? rentalModel.getAllRentals()
        : rentalModel.getAllRentals().filter(rental => rental.idUser === req.user.id);

    res.status(200).json(rentals);
};

exports.getRentalById = (req, res) => {
    const rental = rentalModel.getRentalById(parseInt(req.params.id, 10));

    if (!rental) {
        return res.status(404).json({ message: 'Aluguel não encontrado.' });
    }

    if (!req.user.isAdmin && rental.idUser !== req.user.id) {
        return res.status(403).json({ message: 'Acesso negado.' });
    }

    res.status(200).json(rental);
};

exports.updateRental = (req, res) => {
    const rental = rentalModel.getRentalById(parseInt(req.params.id, 10));

    if (!rental) {
        return res.status(404).json({ message: 'Aluguel não encontrado.' });
    }

    if (!req.user.isAdmin && rental.idUser !== req.user.id) {
        return res.status(403).json({ message: 'Acesso negado.' });
    }

    const updatedRental = rentalModel.updateRental(parseInt(req.params.id, 10), req.body);
    res.status(200).json(updatedRental);
};

exports.deleteRental = (req, res) => {
    const rental = rentalModel.getRentalById(parseInt(req.params.id, 10));

    if (!rental) {
        return res.status(404).json({ message: 'Aluguel não encontrado.' });
    }

    if (!req.user.isAdmin && rental.idUser !== req.user.id) {
        return res.status(403).json({ message: 'Acesso negado.' });
    }

    const deletedRental = rentalModel.deleteRental(parseInt(req.params.id, 10));
    res.status(200).json({deletedRental, message: "Aluguel Excluido!"});
};