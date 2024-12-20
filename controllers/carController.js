const carService = require('../services/carService');

// Cria um carro
exports.createCar = (req, res) => {
    const { marca, modelo, placa, preco } = req.body;

    if (!marca || !modelo || !placa || !preco) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const newCar = carService.createCar({ marca, modelo, placa, preco });
    res.status(201).json({newCar, message: "Carro Criado!"});
};

// Mostra todos os carros
exports.getAllCars = (req, res) => {
    const limit = parseInt(req.query.limite, 10);
    const page = parseInt(req.query.pagina, 10);

    if (!limit || !page) {
        return res.status(400).json({ message: 'Os parâmetros "limite" e "página" são obrigatórios.' });
    }

    try {
        const cars = carService.getAllCarsPaginated(limit, page);
        res.status(200).json(cars);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mostra somente o carro do ID
exports.getCarById = (req, res) => {
    const car = carService.getCarById(parseInt(req.params.id, 10));

    if (!car) {
        return res.status(404).json({ message: 'Carro não encontrado.' });
    }

    res.status(200).json({car, message: "Carro Encontrado!"});
};

// Atualiza um carro
exports.updateCar = (req, res) => {
    const updatedData = req.body;

    // Verifica se há algum campo para atualização
    if (!updatedData || Object.keys(updatedData).length === 0) {
        return res.status(400).json({ message: 'Nenhuma alteração fornecida. Por favor, adicione dados para atualização.' });
    }

    const updatedCar = carService.updateCar(parseInt(req.params.id, 10), updatedData);

    if (!updatedCar) {
        return res.status(404).json({ message: 'Carro não encontrado.' });
    }

    res.status(200).json(updatedCar);
};

// Deleta um carro
exports.deleteCar = (req, res) => {
    const deletedCar = carService.deleteCar(parseInt(req.params.id, 10));

    if (!deletedCar) {
        return res.status(404).json({ message: 'Carro não encontrado.' });
    }

    res.status(200).json({deletedCar, message:"Carro deletado!"});
};

// Filtra todos os carros por modelo
exports.getCarsByModel = (req, res) => {
    const model = req.query.modelo;

    if (!model) {
        return res.status(400).json({ message: 'O parâmetro "modelo" é obrigatório.' });
    }

    const cars = carService.getCarsByModel(model);

    if (cars.length === 0) {
        return res.status(404).json({ message: `Nenhum carro encontrado para o modelo "${model}".` });
    }

    res.status(200).json(cars);
};