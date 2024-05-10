function errorHandler(err, req, res, next) {
	console.error(err.stack);
	res.status(500).json({ error: 'Quelque chose ne marche pas !' });
}

module.exports = errorHandler;
