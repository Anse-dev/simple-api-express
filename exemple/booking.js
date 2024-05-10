'use strict';
const { Model } = require('sequelize');
const User = require('../models/user');
const Room = require('./room');
module.exports = (sequelize, DataTypes) => {
	class Booking extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Booking.belongsTo(User);
			Booking.belongsTo(Room);
		}
	}
	Booking.init(
		{
			numero: DataTypes.STRING,
			checkInDate: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			checkOutDate: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			numberOfGuests: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			totalPrice: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			paymentStatus: {
				type: DataTypes.ENUM('pending', 'paid', 'cancelled'),
				allowNull: false,
				defaultValue: 'pending',
			},
			specialRequests: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: 'Booking',
		}
	);
	return Booking;
};
