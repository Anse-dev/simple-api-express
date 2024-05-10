const adminService = require('../services/adminService');
const { Admin } = require('../../models/index');

class AdminController {
	static async getAllAdmins(req, res) {
		// Logique pour récupérer tous les administrateurs
	}

	static async getAdminById(req, res) {
		// Logique pour récupérer un administrateur par son ID
	}

	static async createAdmin(req, res) {
		// Logique pour créer un administrateur
	}

	static async updateAdmin(req, res) {
		// Logique pour mettre à jour un administrateur
	}
}

module.exports = AdminController;
