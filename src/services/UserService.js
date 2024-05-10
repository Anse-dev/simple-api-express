const { User } = require('../../models');
class UserService {
	static async getAllUsers() {
		return User.findAll();
	}

	static async getUserById(userId) {
		return User.findByPk(userId);
	}

	static async createUser(lastName, firstName, email, password) {
		return User.create({ lastName, firstName, email, password });
	}

	static async updateUser(userId, userData) {
		const user = await User.findByPk(userId);

		if (!user) {
			throw new Error('User not found');
		}

		await user.update(userData);

		return user;
	}
}

module.exports = UserService;
