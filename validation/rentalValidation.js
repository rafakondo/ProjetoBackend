const { body, param, validationResult } = require('express-validator');

// Middleware para validar JSON de um aluguel
const validateRental = [
    body('idCarro')
        .notEmpty().withMessage('O ID do carro é obrigatório.')
        .isInt({ min: 1 }).withMessage('O ID do carro deve ser um inteiro positivo.'),
    body('idUser')
        .notEmpty().withMessage('O ID do usuário é obrigatório.')
        .isInt({ min: 1 }).withMessage('O ID do usuário deve ser um inteiro positivo.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Middleware para validar o id de um aluguel
const validateRentalId = [
    param('id')
        .isInt({ min: 1 }).withMessage('ID do aluguel deve ser um inteiro positivo.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateRental, validateRentalId };