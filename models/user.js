'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,

				validate: {
					isEmail: true,
				},
				unique: true,
			},
			role: {
				type: DataTypes.ENUM('user', 'owner', 'admin'),
				defaultValue: 'user',
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			is_valid: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
			valid_token: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
