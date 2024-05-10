const express = require('express');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const authMiddleware = require('../middleware/authMiddleware');

const UserRoutes = express.Router();

UserRoutes.post('/login', AuthController.login);
UserRoutes.post('/register', AuthController.register);
UserRoutes.use(authMiddleware);
UserRoutes.get('/', UserController.getUsers);
UserRoutes.get('/:userId', UserController.getUserById);
UserRoutes.put('/:userId', UserController.updateUser);
UserRoutes.post('/', UserController.createUser);

// Ajouter d'autres routes pour créer, mettre à jour et supprimer des utilisateurs

module.exports = UserRoutes;
