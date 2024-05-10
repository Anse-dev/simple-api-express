const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

class AuthController {
	static async login(req, res) {
		const { email, password } = req.body;

		try {
			// Vérification si l'utilisateur existe
			const user = await User.findOne({ where: { email } });
			if (!user) {
				return res.status(404).json({ error: 'Utilisateur non trouvé' });
			}

			// Vérification du mot de passe
			const isValidPassword = await bcrypt.compare(password, user.password);
			if (!isValidPassword) {
				return res.status(401).json({ error: 'Mot de passe incorrect' });
			}

			// Génération du token d'authentification
			const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
				expiresIn: '1h',
			});
			console.log(token);
			// Retourner le token et les informations de l'utilisateur
			res.status(200).json({
				token,
				user: { id: user.id, email: user.email },
			});
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	static async register(req, res) {
		const { lastName, firstName, email, password } = req.body;

		try {
			// Vérification si l'utilisateur existe déjà
			const existingUser = await User.findOne({ where: { email } });
			if (existingUser) {
				return res.status(409).json({ error: "L'utilisateur existe déjà" });
			}

			// Hachage du mot de passe
			const hashedPassword = await bcrypt.hash(password, 10);
			const newUser = await User.create({
				lastName,
				firstName,
				email,
				password: hashedPassword,
			});

			// Retourner les informations de l'utilisateur créé
			res.status(201).json(newUser);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
}

module.exports = AuthController;

// M V P
