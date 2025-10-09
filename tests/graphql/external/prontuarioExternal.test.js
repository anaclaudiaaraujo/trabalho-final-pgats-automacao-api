
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
	it('Não deve permitir criar prontuário para animal inexistente', async () => {
		const token = respostaLogin.body.data.login.token;
		const mutation = {
			query: `mutation {
				createProntuario(input: {
					dataAtendimento: "10/10/2025",
					descricao: "Consulta animal inexistente",
					tratamento: "Nenhum",
					exames: "Nenhum",
					animalId: 9999
				}) {
					id
				}
			}`
		};
		const resposta = await request(BASE_URL_GRAPHQL)
			.post('/graphql')
			.set('Authorization', `Bearer ${token}`)
			.send(mutation);
		expect(resposta.body).to.have.property('errors');
		expect(resposta.body.errors[0].message).to.match(/Animal não encontrado/i);
	});
});