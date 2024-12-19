const express = require('express');
const carController = require('../controllers/carController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const { validateCar, validateCarId } = require('../validation/carValidation');


const router = express.Router();

// Rotas protegidas
router.post('/', validateCar, authenticateToken, isAdmin, carController.createCar);
router.get('/', authenticateToken, carController.getAllCars);
router.put('/:id', authenticateToken, isAdmin, carController.updateCar);
router.delete('/:id', authenticateToken, isAdmin, carController.deleteCar);
router.get('/:id', validateCarId, authenticateToken, carController.getCarById);

module.exports = router;