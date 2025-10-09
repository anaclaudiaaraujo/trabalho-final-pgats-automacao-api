
const request = require('supertest');
const { expect } = require('chai');

const BASE_URL_REST = 'http://localhost:3000/api';


describe('Testes de Gestão de Pets', () => {
  beforeEach(async () => {
    respostaLogin = await request(BASE_URL_REST)
      .post('/auth/login')
      .send({
        email: 'recepcao@clinicavet.local',
        password: 'tesT123'
      });
  });

	it('Validar que é possível cadastrar um animal de estimação', async () => {
		const payload = {
			nome: "Tatu",
			especie: "Cachorro",
			raca: "SRD",
			dataNascimento: "01/03/2023",
			tutorId: 1
		}

			const respostaCadastro = await request(BASE_URL_REST)
				.post('/animais')
				.set('Authorization', `Bearer ${respostaLogin.body.token}`)
				.send(payload);

		expect(respostaCadastro.status).to.equal(201);
		delete respostaCadastro.body.id;
		expect(respostaCadastro.body).to.deep.equal({
			"nome": "Tatu",
			"especie": "Cachorro",
			"raca": "SRD",
			"dataNascimento": "01/03/2023",
			"tutorId": 1
		});
	});

	it('Validar que é possível obter dados de um animal de estimação cadastrado', async () => {
			const respostaGetById = await request(BASE_URL_REST)
				.get('/animais/1')
			.set('Authorization', `Bearer ${respostaLogin.body.token}`);

		expect(respostaGetById.status).to.equal(200);
	});

})