const express = require('express');
const rentalController = require('../controllers/rentalController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Rotas protegidas
router.post('/', authenticateToken, isAdmin, rentalController.createRental);
router.get('/', authenticateToken, rentalController.getAllRentals);
router.put('/:id', authenticateToken, isAdmin, rentalController.updateRental);
router.delete('/:id', authenticateToken, isAdmin, rentalController.deleteRental);
router.get('/:id', authenticateToken, rentalController.getRentalById);

module.exports = router;