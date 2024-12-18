const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.login = (username, password) => {
    const user = userModel.getAllUsers().find(u => u.username === username && u.password === password);
    if (!user) return null;

    // Gera token JWT
    const token = jwt.sign(
        { id: user.id, username: user.username, isAdmin: user.isAdmin },
        'secret_key',
        { expiresIn: '1h' }
    );
    return token;
};

// realiza as chamadas declaradas em Model
exports.getAllUsers = () => userModel.getAllUsers();

exports.getUserById = (id) => userModel.getUserById(id);

exports.createUser = (user) => userModel.createUser(user);

exports.updateUser = (id, updatedUser) => userModel.updateUser(id, updatedUser);

exports.deleteUser = (id) => userModel.deleteUser(id);