const { body, param, validationResult } = require('express-validator');

// Middleware para validar JSON com chaves username e email
const validateUser = [
    body('username')
        .notEmpty().withMessage('O usuário é obrigatório.')
        .isLength({ min: 3, max: 30 }).withMessage('O nome de usuário deve ter entre 3 e 30 caracteres.'),
    body('password')
        .notEmpty().withMessage('A senha é obrigatória.')
        .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres.'),
    body('email')
        .notEmpty().withMessage('O email é obrigatório.')
        .isEmail().withMessage('O Formato de email está inválido.'),
    body('nome')
        .notEmpty().withMessage('O nome é obrigatório.')
        .isLength({ min: 3 }).withMessage('O nome deve ter pelo menos 3 caracteres.'),
    body('idade')
        .notEmpty().withMessage('A idade é obrigatória.')
        .isInt({ min: 0 }).withMessage('A idade deve ser um número inteiro positivo.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Middleware para validar o parâmetro ID da rota
const validateUserId = [
    param('id')
        .isInt({ min: 1 }).withMessage('ID do usuário deve ser um inteiro positivo.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateUser, validateUserId };
