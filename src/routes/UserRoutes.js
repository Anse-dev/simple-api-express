const express = require('express');
const UserController = require('../controllers/UserController');

const UserRoutes = express.Router();

UserRoutes.get('/', UserController.getUsers);
UserRoutes.get('/:userId', UserController.getUserById);
UserRoutes.post('/', UserController.createUser);
// Ajouter d'autres routes pour créer, mettre à jour et supprimer des utilisateurs

module.exports = UserRoutes;
