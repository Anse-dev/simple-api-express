const { User } = require('../../models');
class UserService {
	static async getAllUsers() {
		return User.findAll();
	}

	static async getUserById(userId) {
		return User.findByPk(userId);
	}
	static async createUser(lastName, firstName, email) {
		return User.create({ lastName, firstName, email });
	}

	// Autres méthodes de service pour créer, mettre à jour et supprimer des utilisateurs
}

module.exports = UserService;
