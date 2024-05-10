const ownerService = require('../services/ownerService');

class OwnerController {
	// Créer un hôtel
	static async createHotel(req, res) {
		const { ownerId, ...hotelData } = req.body;
		try {
			const newHotel = await ownerService.createHotel(ownerId, hotelData);
			res.status(201).json(newHotel);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	// Supprimer un hôtel
	static async deleteHotel(req, res) {
		const hotelId = req.params.hotelId;
		try {
			await ownerService.deleteHotel(hotelId);
			res.status(204).end();
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	// Modifier un hôtel
	static async updateHotel(req, res) {
		const hotelId = req.params.hotelId;
		const updatedData = req.body;
		try {
			const updatedHotel = await ownerService.updateHotel(
				hotelId,
				updatedData
			);
			res.json(updatedHotel);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	// Voir toutes les réservations
	static async getAllBooking(req, res) {
		const ownerId = req.params.ownerId;
		try {
			const reservations = await ownerService.getAllBooking(ownerId);
			res.json(reservations);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	// Valider une réservation d'un utilisateur
	static async approveBooking(req, res) {
		const reservationId = req.params.reservationId;
		try {
			await ownerService.approveBooking(reservationId);
			res.status(200).json({ message: 'Booking approved successfully' });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	// Refuser une réservation
	static async rejectBooking(req, res) {
		const reservationId = req.params.reservationId;
		try {
			await ownerService.rejectBooking(reservationId);
			res.status(200).json({ message: 'Booking rejected successfully' });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	// Répondre à un avis sur un hôtel spécifique
	static async replyToReview(req, res) {
		const { hotelId, reviewId, reply } = req.body;
		try {
			await ownerService.replyToReview(hotelId, reviewId, reply);
			res.status(200).json({ message: 'Reply added successfully' });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	// Ajouter une chambre à un hôtel existant
	static async addRoomToHotel(req, res) {
		const hotelId = req.params.hotelId;
		const roomData = req.body;
		try {
			const newRoom = await ownerService.addRoomToHotel(hotelId, roomData);
			res.status(201).json(newRoom);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	// Supprimer une chambre d'un hôtel
	static async deleteRoomFromHotel(req, res) {
		const { hotelId, roomId } = req.params;
		try {
			await ownerService.deleteRoomFromHotel(hotelId, roomId);
			res.status(204).end();
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	// Mettre à jour les détails d'une chambre dans un hôtel
	static async updateRoomInHotel(req, res) {
		const { hotelId, roomId } = req.params;
		const updatedRoomData = req.body;
		try {
			const updatedRoom = await ownerService.updateRoomInHotel(
				hotelId,
				roomId,
				updatedRoomData
			);
			res.json(updatedRoom);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
	// Afficher les chambres d'un hôtel avec pagination
	static async getHotelRooms(req, res) {
		const { hotelId } = req.params;
		const { page, limit } = req.query;
		try {
			const rooms = await ownerService.getHotelRooms(hotelId, page, limit);
			res.json(rooms);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
}

module.exports = OwnerController;
