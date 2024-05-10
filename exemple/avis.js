'use strict';
const { Model } = require('sequelize');
const Review = require('./review');
const User = require('../models/user');
const Hotel = require('./hotel');
module.exports = (sequelize, DataTypes) => {
	class Avis extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Review.belongsTo(User);
			Review.belongsTo(Hotel);
		}
	}
	Avis.init(
		{
			note: DataTypes.STRING,
			rating: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			comment: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Avis',
		}
	);
	return Avis;
};
