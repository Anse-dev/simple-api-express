'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Hotel extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Hotel.init(
		{
			address: DataTypes.STRING,
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			address: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			city: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Hotel',
		}
	);
	return Hotel;
};
