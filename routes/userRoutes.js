const express = require('express');
const userController = require('../controllers/userController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const { validateUser } = require('../validation/userValidation');

const router = express.Router();

// Rota pública
router.post('/login', userController.login);
router.get('/install', userController.install);
router.post('/user', authenticateToken, validateUser, userController.createUser);
router.get('/', authenticateToken, userController.getAllUsers);

// Rotas protegidas
router.post('/admin', authenticateToken, isAdmin, validateUser, userController.createAdmin);
router.put('/:id', authenticateToken, userController.updateUser);
router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;