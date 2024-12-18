const express = require('express');
const carController = require('../controllers/carController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Rotas protegidas
router.post('/', authenticateToken, isAdmin, carController.createCar);
router.get('/', authenticateToken, carController.getAllCars);
router.put('/:id', authenticateToken, isAdmin, carController.updateCar);
router.delete('/:id', authenticateToken, isAdmin, carController.deleteCar);
router.get('/:id', authenticateToken, carController.getCarById);

module.exports = router;