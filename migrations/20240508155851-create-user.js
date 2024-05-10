'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},

			firstName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			lastName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,

				validate: {
					isEmail: true,
				},
				unique: true,
			},
			role: {
				type: Sequelize.ENUM('user', 'owner', 'admin'),
				defaultValue: 'user',
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			is_valid: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
			},
			valid_token: {
				type: Sequelize.STRING,
			},

			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Users');
	},
};
