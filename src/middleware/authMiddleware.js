const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
	const token = req.headers.authorization?.replace('Bearer ', '');

	if (!token) {
		return res.status(401).json({ message: 'Forbidden for user' });
	}

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		req.userRole = decodedToken.role;
		next();
	} catch (error) {
		res.status(403).json({ message: 'Token invalide' });
	}
}

module.exports = authMiddleware;
