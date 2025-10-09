const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../../src/rest/app');
const animalService = require('../../../src/common/services/animalService');

describe('Animal Controller', () => {
	beforeEach(async () => {
		respostaLogin = await request(app)
			.post('/api/auth/login')
			.send({
				email: 'recepcao@clinicavet.local',
				password: 'tesT123'
			});
	});

	afterEach(() => sinon.restore());

	describe('POST /animais', () => {
		it('Quando informo dados válidos no cadastro de um animal de estimação, o retorno é 201', async () => {
			const animalServiceMock = sinon.stub(animalService, 'create');
			animalServiceMock.returns({
				id: 1,
				nome: "Tatu",
				especie: "Cachorro",
				raca: "SRD",
				dataNascimento: "01/03/2023",
				tutorId: 1
			})

			const respostaCadastro = await request(app)
				.post('/api/animais')
				.set('Authorization', `Bearer ${respostaLogin.body.token}`)
				.send({
					nome: "Tatu",
					especie: "Cachorro",
					raca: "SRD",
					dataNascimento: "01/03/2023",
					tutorId: 1
				});

			expect(respostaCadastro.status).to.equal(201);

			const respostaEsperada = require('../fixture/animais/quandoInformoDadosValidosORetornoE201.json');

			delete respostaCadastro.body.id;
			expect(respostaCadastro.body).to.deep.equal(respostaEsperada)

		});

		it('Quando informo id de tutor inválido no cadastro de um animal de estimação, o retorno é ', async () => {
			const animalServiceMock = sinon.stub(animalService, 'create');
			animalServiceMock.throws(new Error('Tutor não encontrado'));

			const respostaCadastro = await request(app)
				.post('/api/animais')
				.set('Authorization', `Bearer ${respostaLogin.body.token}`)
				.send({
					nome: "Tatu",
					especie: "Cachorro",
					raca: "SRD",
					dataNascimento: "01/03/2023",
					tutorId: 1
				});

			expect(respostaCadastro.status).to.equal(400);
			expect(respostaCadastro.body).to.have.property('message', 'Tutor não encontrado');

		});

	});
	describe('GET /animais', () => {
		it('Quando busco por um id não cadastrado, o retorno é 404', async () => {
			const animalServiceMock = sinon.stub(animalService, 'getById');
			// quando não existe, o serviço deve retornar null
			animalServiceMock.returns(null);

			const respostaCadastro = await request(app)
				.get('/api/animais/1')
				.set('Authorization', `Bearer ${respostaLogin.body.token}`);

			expect(respostaCadastro.status).to.equal(404);
			expect(respostaCadastro.body).to.have.property('message', 'Animal não encontrado');
		});
	});
});