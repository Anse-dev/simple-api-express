const express = require('express');
const hotelController = require('../controllers/hotelController');
const authMiddleware = require('../middleware/authMiddleware');

const hotelRoutes = express.Router();

// Middleware d'authentification pour sécuriser les routes
hotelRoutes.use(authMiddleware);

// Routes pour les hôtels
hotelRoutes.get('/', hotelController.getAllHotels);
hotelRoutes.get('/:hotelId', hotelController.getHotelById);
hotelRoutes.put('/:hotelId', hotelController.updateHotel);
hotelRoutes.post('/', hotelController.createHotel);
// Ajouter d'autres routes pour créer, mettre à jour et supprimer des hôtels

module.exports = hotelRoutes;
