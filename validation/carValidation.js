const { body, param, validationResult } = require('express-validator');

// Middleware para validar json de um carro
const validateCar = [
    body('marca')
        .notEmpty().withMessage('A marca é obrigatória.')
        .isLength({ min: 2, max: 50 }).withMessage('A marca deve ter entre 2 e 50 caracteres.'),
    body('modelo')
        .notEmpty().withMessage('O modelo é obrigatório.')
        .isLength({ min: 1, max: 50 }).withMessage('O modelo deve ter entre 1 e 50 caracteres.'),
    body('placa')
        .notEmpty().withMessage('A placa é obrigatória.')
        .isLength({ min: 7, max: 7 }).withMessage('A placa deve ter exatamente 7 caracteres.'),
    body('preco')
        .notEmpty().withMessage('O preço é obrigatório.')
        .isFloat({ min: 0 }).withMessage('O preço deve ser um número maior ou igual a zero.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Middleware para validar o id de um carro
const validateCarId = [
    param('id')
        .isInt({ min: 1 }).withMessage('ID do carro deve ser um inteiro positivo.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateCar, validateCarId };