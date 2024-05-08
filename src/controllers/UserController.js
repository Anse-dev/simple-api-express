const UserService = require('../services/UserService');
const { User } = require('../../models');
class UserController {
	static async getUsers(req, res) {
		try {
			const users = await UserService.getAllUsers();
			res.json(users);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	static async getUserById(req, res) {
		try {
			const user = await UserService.getUserById(req.params.userId);
			if (!user) {
				res.status(404).json({ error: 'User not found' });
			} else {
				res.json(user);
			}
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
	static async createUser(req, res) {
		const { lastName, firstName, email } = req.body;
		const verifyUserEmail = await User.findOne({
			where: {
				email: email,
			},
		});
		if (verifyUserEmail) {
			return res.status(500).json({ message: "L'email existe deja !!" });
		}
		try {
			await UserService.createUser(lastName, firstName, email);

			res.status(201).json({ message: 'Succes' });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	// Autres méthodes de contrôleur pour créer, mettre à jour et supprimer des utilisateurs
}

module.exports = UserController;
