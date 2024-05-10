const bookingService = require('../services/bookingService');
const { Booking } = require('../../models/index');

class BookingController {
	static async getAllBookings(req, res) {
		// Logique pour récupérer toutes les réservations
	}

	static async getBookingById(req, res) {
		// Logique pour récupérer une réservation par son ID
	}

	static async createBooking(req, res) {
		// Logique pour créer une réservation
	}

	static async updateBooking(req, res) {
		// Logique pour mettre à jour une réservation
	}
}

module.exports = BookingController;
