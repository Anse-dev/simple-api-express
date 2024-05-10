const express = require('express');
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

const bookingRoutes = express.Router();

// Middleware d'authentification pour sécuriser les routes
bookingRoutes.use(authMiddleware);

// Routes pour les réservations
bookingRoutes.get('/', bookingController.getAllBookings);
bookingRoutes.get('/:bookingId', bookingController.getBookingById);
bookingRoutes.put('/:bookingId', bookingController.updateBooking);
bookingRoutes.post('/', bookingController.createBooking);
// Ajouter d'autres routes pour créer, mettre à jour et supprimer des réservations

module.exports = bookingRoutes;
