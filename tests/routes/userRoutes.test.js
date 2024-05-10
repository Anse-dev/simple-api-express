const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../models/index');
const { User } = require('../../models');

beforeEach(async () => {
	await sequelize.sync({ force: true });
});

afterAll(async () => {
	await sequelize.close();
});
describe('When should get All User', () => {
	it('should get all users', async () => {
		const res = await request(app).get('/api/users/');
		expect(res.statusCode).toEqual(200);
		expect(res.body).toBeInstanceOf(Array);
	});

	it('should return 500 error when not defined password  create a new user', async () => {
		const userData = {
			firstName: 'John',
			lastName: 'Doe',
			email: 'john@gmail.com',
		};

		const res = await request(app).post('/api/users').send(userData);

		expect(res.statusCode).toEqual(500);

		expect(res.body.message).toEqual(res.body.message);
	});
	it('should create a new user', async () => {
		const userData = {
			firstName: 'John',
			lastName: 'Doe',
			email: 'john@gmail.com',
			password: 'password ',
		};

		const res = await request(app).post('/api/users').send(userData);

		expect(res.statusCode).toEqual(201);

		expect(res.body.message).toEqual('Succes');
	});
	it('should get all users', async () => {
		// Insert some dummy users into the database
		await User.bulkCreate([
			{
				firstName: 'Alice',
				lastName: 'Smith',
				email: 'alice@example.com',
				password: 'monmotdepasse',
			},
			{
				firstName: 'Bob',
				lastName: 'Jones',
				email: 'bob@example.com',
				password: 'monmotdepasse',
			},
		]);

		const res = await request(app).get('/api/users');

		expect(res.statusCode).toEqual(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body.length).toEqual(2); // Assuming we inserted 2 dummy users
	});
});

describe('Get User by ID Endpoint', () => {
	it('should get a user by ID', async () => {
		// Insert a dummy user into the database
		const user = await User.create({
			firstName: 'Alice',
			lastName: 'Smith',
			email: 'alice@example.com',
			password: 'monmotdepasse',
		});

		const res = await request(app).get(`/api/users/${user.id}`);

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('id', user.id);
		expect(res.body.firstName).toEqual(user.firstName);
		expect(res.body.lastName).toEqual(user.lastName);
		expect(res.body.email).toEqual(user.email);
	});

	it('should return 404 if user not existe ', async () => {
		const res = await request(app).get(`/api/users/100`);
		expect(res.statusCode).toEqual(404);
		expect(res.body.error).toEqual(res.body.error);
	});
});

describe('Update User Endpoint', () => {
	it('should return 201 update an existing user', async () => {
		// Insert a dummy user into the database
		const user = await User.create({
			firstName: 'Alice',
			lastName: 'Smith',
			email: 'alice@gmail.com',
			password: 'monmotdepasse',
		});

		const updatedUserData = {
			firstName: 'UpdatedFirstName',
			lastName: 'UpdatedLastName',
			email: 'updated@gmail.com',
			password: 'monmotdepasse',
		};

		const res = await request(app)
			.put(`/api/users/${user.id}`)
			.send(updatedUserData);

		expect(res.statusCode).toEqual(201);
		expect(res.body.firstName).toEqual(updatedUserData.firstName);
		expect(res.body.lastName).toEqual(updatedUserData.lastName);
		expect(res.body.email).toEqual(updatedUserData.email);
	});
	it("Should 500 error when Id of user don't existe for update ", async () => {
		// Insert a dummy user into the database

		const updatedUserData = {
			firstName: 'UpdatedFirstName',
			lastName: 'UpdatedLastName',
			email: 'updated@gmail.com',
			password: 'monmotdepasse',
		};

		const res = await request(app).put(`/api/users/1`).send(updatedUserData);
		expect(res.statusCode).toEqual(500);
		expect(res.body.error).toEqual(res.body.error);
	});
});
