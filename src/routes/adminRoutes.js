const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

const adminRoutes = express.Router();

// Middleware d'authentification pour sécuriser les routes
adminRoutes.use(authMiddleware);

// Routes pour les administrateurs
adminRoutes.get('/', adminController.getAllAdmins);
adminRoutes.get('/:adminId', adminController.getAdminById);
adminRoutes.put('/:adminId', adminController.updateAdmin);
adminRoutes.post('/', adminController.createAdmin);
// Ajouter d'autres routes pour créer, mettre à jour et supprimer des administrateurs

module.exports = adminRoutes;
