const rentalService = require('../services/rentalService');

// Cria um aluguel
exports.createRental = (req, res) => {
    const { idCarro, idUser } = req.body;

    if (!idCarro || !idUser) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const newRental = rentalService.createRental({ idCarro, idUser });
    res.status(201).json({newRental, message: "Aluguel Criado!"});
};

// Mostra todos alugueis
exports.getAllRentals = (req, res) => {
    const limit = parseInt(req.query.limite, 10);
    const page = parseInt(req.query.pagina, 10);

    if (!limit || !page) {
        return res.status(400).json({ message: 'Os parâmetros "limite" e "página" são obrigatórios.' });
    }

    try {
        const rentals = rentalService.getAllRentalsPaginated(limit, page);
        res.status(200).json(rentals);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mostra o aluguel pelo ID
exports.getRentalById = (req, res) => {
    const rental = rentalService.getRentalById(parseInt(req.params.id, 10));

    if (!rental) {
        return res.status(404).json({ message: 'Aluguel não encontrado.' });
    }

    if (!req.user.isAdmin && rental.idUser !== req.user.id) {
        return res.status(403).json({ message: 'Acesso negado.' });
    }

    res.status(200).json({rental, message: "Aluguel Encontrado!"});
};

// Atualiza um aluguel
exports.updateRental = (req, res) => {
    const rentalId = parseInt(req.params.id, 10);
    const rental = rentalService.getRentalById(rentalId);

    if (!rental) {
        return res.status(404).json({ message: 'Aluguel não encontrado.' });
    }

    if (!req.user.isAdmin && rental.idUser !== req.user.id) {
        return res.status(403).json({ message: 'Acesso negado.' });
    }

    const updatedData = req.body;

    // Verifica se há algum campo para atualização
    if (!updatedData || Object.keys(updatedData).length === 0) {
        return res.status(400).json({ message: 'Nenhuma alteração fornecida. Por favor, adicione dados para atualização.' });
    }

    const updatedRental = rentalService.updateRental(rentalId, updatedData);
    res.status(200).json({ updatedRental, message: 'Aluguel atualizado!' });
};

// Deleta um aluguel
exports.deleteRental = (req, res) => {
    const rental = rentalService.getRentalById(parseInt(req.params.id, 10));

    if (!rental) {
        return res.status(404).json({ message: 'Aluguel não encontrado.' });
    }

    if (!req.user.isAdmin && rental.idUser !== req.user.id) {
        return res.status(403).json({ message: 'Acesso negado.' });
    }

    const deletedRental = rentalService.deleteRental(parseInt(req.params.id, 10));
    res.status(200).json({deletedRental, message: "Aluguel Excluido!"});
};