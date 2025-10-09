
const request = require('supertest');
const { expect } = require('chai');

const BASE_URL_GRAPHQL = 'http://localhost:4000';

describe('Testes de Prontuário', () => {
	const loginFixture = require('../fixture/mutations/login/loginUser.json');
	let respostaLogin;
	beforeEach(async () => {
		respostaLogin = await request(BASE_URL_GRAPHQL)
			.post('/graphql')
			.send(loginFixture);
	});

	it('Validar que o prontuário é retornado com as informações do atendimento, animal e tutor', async () => {
		const token = respostaLogin.body.data.login.token;
		console.log(token);
		const prontuarioFixture = require('../fixture/mutations/prontuario/prontuarioAtendimento.json');
		const respostaEsperada = require('../fixture/respostas/respostaProntuario.json');

		const respostaReqProntuario = await request(BASE_URL_GRAPHQL)
			.post('/graphql')
			.set('Authorization', `Bearer ${token}`)
			.send(prontuarioFixture);

		expect(respostaReqProntuario.body.data).to.deep.equal(respostaEsperada);
	});
});