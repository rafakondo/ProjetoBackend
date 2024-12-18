const jwt = require('jsonwebtoken');

// Middleware de autenticação
exports.authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    jwt.verify(token.split(" ")[1], 'secret_key', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido.' });
        }
        req.user = user; // Adiciona o usuário decodificado no request
        next();
    });
};

// Middleware para verificar se o usuário é administrador
exports.isAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem acessar.' });
    }
    next();
};
