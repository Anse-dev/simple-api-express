const { Booking, Room } = require('../../models/index');

class BookingService {
	// Récupérer toutes les réservations d'un utilisateur par son ID
	static async getAllBookingsByUserId(userId) {
		return await Booking.findAll({ where: { userId } });
	}

	// Récupérer toutes les réservations d'une chambre par son ID
	static async getAllBookingsByRoomId(roomId) {
		return await Booking.findAll({ where: { roomId } });
	}

	// Faire une nouvelle réservation pour un utilisateur et une chambre
	static async createBooking(userId, roomId, bookingDetails) {
		const { checkInDate, checkOutDate, guests } = bookingDetails;
		return await Booking.create({
			userId,
			roomId,
			checkInDate,
			checkOutDate,
			guests,
		});
	}

	// Permettre à un utilisateur d'annuler une réservation
	static async cancelBooking(bookingId) {
		const booking = await Booking.findByPk(bookingId);
		if (!booking) {
			throw new Error('Booking not found');
		}
		await booking.destroy();
	}

	// Permettre à un utilisateur de modifier une réservation
	static async updateBooking(bookingId, updatedBookingDetails) {
		const booking = await Booking.findByPk(bookingId);
		if (!booking) {
			throw new Error('Booking not found');
		}
		await booking.update(updatedBookingDetails);
		return booking;
	}
}

module.exports = BookingService;
