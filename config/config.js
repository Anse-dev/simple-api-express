const dotEnv = require('dotenv').config();
const fs = require('fs');

module.exports = {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: '127.0.0.1',
		port: 3306,
		dialect: 'mysql',
		logging: false,
		dialectOptions: {
			bigNumberStrings: true,
		},
	},
	test: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: '127.0.0.1',
		port: 3306,
		dialect: 'mysql',
		logging: false,
		dialectOptions: {
			bigNumberStrings: true,
		},
	},
	production: {
		username: process.env.PROD_DB_USERNAME,
		password: process.env.PROD_DB_PASSWORD,
		database: process.env.PROD_DB_NAME,
		host: process.env.PROD_DB_HOSTNAME,
		port: process.env.PROD_DB_PORT,
		dialect: 'mysql',
		dialectOptions: {
			bigNumberStrings: true,
			/* ssl: {
				ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt'),
			}, */
		},
	},
};
