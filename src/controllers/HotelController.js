const hotelService = require('../services/hotelService');
const { Hotel } = require('../../models/index');

class HotelController {
	static async getHotelById(req, res) {
		try {
			const hotel = await hotelService.getHotelById(req.params.hotelId);
			if (!hotel) {
				res.status(404).json({ error: 'Hotel not found' });
			} else {
				res.json(hotel);
			}
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	// Méthode de pagination
	static async getAllHotels(req, res) {
		// Récupérer les paramètres de pagination depuis la requête
		const { page, limit } = req.query;
		try {
			const hotels = await hotelService.getAllHotels(page, limit);
			res.json(hotels);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
	// Filtrer les hôtels par ville, prix croissant, type (résidence ou hôtel), noté
	static async filterHotels(req, res) {
		const { city, sortByPrice, type, rated } = req.query;
		try {
			const filteredHotels = await hotelService.filterHotels(
				city,
				sortByPrice,
				type,
				rated
			);
			res.json(filteredHotels);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
}

module.exports = HotelController;
