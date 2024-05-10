const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');
const AuthController = require('../../src/controllers/AuthController');

jest.mock('../../models');

describe('AuthController', () => {
	describe('login', () => {
		it('should return a JWT token if login is successful', async () => {
			const mockUser = {
				id: 1,
				email: 'test@example.com',
				password: await bcrypt.hash('password', 10),
			};

			User.findOne.mockResolvedValue(mockUser);
			bcrypt.compare = jest.fn().mockResolvedValue(true);
			jwt.sign = jest.fn(() => 'mockToken');

			const req = {
				body: { email: 'test@example.com', password: 'password' },
			};
			const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

			await AuthController.login(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				token: 'mockToken',
				user: { id: 1, email: 'test@example.com' },
			});
		});

		it('should return a 404 error if user is not found', async () => {
			User.findOne.mockResolvedValue(null);

			const req = {
				body: { email: 'test@example.com', password: 'password' },
			};
			const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

			await AuthController.login(req, res);

			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.json).toHaveBeenCalledWith({
				error: 'Utilisateur non trouvé',
			});
		});

		it('should return a 401 error if password is incorrect', async () => {
			const mockUser = {
				id: 1,
				email: 'test@example.com',
				password: await bcrypt.hash('password', 10),
			};
			User.findOne.mockResolvedValue(mockUser);
			bcrypt.compare.mockResolvedValue(false);

			const req = {
				body: { email: 'test@example.com', password: 'wrongPassword' },
			};
			const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

			await AuthController.login(req, res);

			expect(res.status).toHaveBeenCalledWith(401);
			expect(res.json).toHaveBeenCalledWith({
				error: 'Mot de passe incorrect',
			});
		});

		it('should return a 500 error if an error occurs', async () => {
			User.findOne.mockRejectedValue(new Error('Database error'));

			const req = {
				body: { email: 'test@example.com', password: 'password' },
			};
			const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

			await AuthController.login(req, res);

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
		});
	});

	describe('register', () => {
		it('should create a new user if registration is successful', async () => {
			User.findOne.mockResolvedValue(null);
			User.create.mockResolvedValue({ id: 1, email: 'test@example.com' });

			const req = {
				body: {
					lastName: 'Doe',
					firstName: 'John',
					email: 'test@example.com',
					password: 'password',
				},
			};
			const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

			await AuthController.register(req, res);

			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledWith({
				id: 1,
				email: 'test@example.com',
			});
		});

		it('should return a 409 error if user already exists', async () => {
			User.findOne.mockResolvedValue({ id: 1, email: 'test@example.com' });

			const req = {
				body: {
					lastName: 'Doe',
					firstName: 'John',
					email: 'test@example.com',
					password: 'password',
				},
			};
			const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

			await AuthController.register(req, res);

			expect(res.status).toHaveBeenCalledWith(409);
			expect(res.json).toHaveBeenCalledWith({
				error: "L'utilisateur existe déjà",
			});
		});

		it('should return a 500 error if an error occurs', async () => {
			User.findOne.mockRejectedValue(new Error('Database error'));

			const req = {
				body: {
					lastName: 'Doe',
					firstName: 'John',
					email: 'test@example.com',
					password: 'password',
				},
			};
			const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

			await AuthController.register(req, res);

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
		});
	});
});
