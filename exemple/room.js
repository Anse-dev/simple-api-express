'use strict';
const { Model } = require('sequelize');

const Hotel = require('./hotel');
module.exports = (sequelize, DataTypes) => {
	class Room extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Room.belongsTo(Hotel);
		}
	}
	Room.init(
		{
			numero: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			type: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			price: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Room',
		}
	);
	return Room;
};
