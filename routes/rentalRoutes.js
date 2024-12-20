const express = require('express');
const rentalController = require('../controllers/rentalController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const { validateRental, validateRentalId } = require('../validation/rentalValidation');


const router = express.Router();

// Rotas protegidas
router.post('/', validateRental,authenticateToken, isAdmin, rentalController.createRental);
router.get('/', authenticateToken, rentalController.getAllRentals);                             // exemplo de requisição: /rentals?limite=10&pagina=3
router.put('/:id', authenticateToken, isAdmin, rentalController.updateRental);
router.delete('/:id', authenticateToken, isAdmin, rentalController.deleteRental);
router.get('/:id', validateRentalId,authenticateToken, rentalController.getRentalById);

module.exports = router;