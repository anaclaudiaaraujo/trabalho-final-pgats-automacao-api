const { expect } = require('chai');
const sinon = require('sinon');
const TutorService = require('../../../src/common/services/tutorService');
const tutorController = require('../../../src/rest/controllers/tutorController');

describe('TutorController', () => {
	let req, res, sandbox;

	beforeEach(() => {
		sandbox = sinon.createSandbox();
		req = {};
		res = {
			json: sandbox.stub(),
			status: sandbox.stub().returnsThis(),
			send: sandbox.stub()
		};
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('getById', () => {
		it('deve retornar o tutor quando encontrado', () => {
			req.params = { id: '1' };
			const tutor = { id: 1, nome: 'João' };
			sandbox.stub(TutorService, 'getById').returns(tutor);

			tutorController.getById(req, res);

			expect(res.json.calledWith(tutor)).to.be.true;
		});

		it('deve retornar 404 quando o tutor não for encontrado', () => {
			req.params = { id: '99' };
			sandbox.stub(TutorService, 'getById').returns(null);

			tutorController.getById(req, res);

			expect(res.status.calledWith(404)).to.be.true;
			expect(res.json.calledWith({ message: 'Tutor não encontrado' })).to.be.true;
		});
	});

	describe('create', () => {
		it('deve criar o tutor e retornar 201', () => {
			req.body = { nome: 'Maria' };
			const created = { id: 2, nome: 'Maria' };
			sandbox.stub(TutorService, 'create').returns(created);

			tutorController.create(req, res);

			expect(res.status.calledWith(201)).to.be.true;
			expect(res.json.calledWith(created)).to.be.true;
		});
	});

	describe('update', () => {
		it('deve atualizar o tutor quando encontrado', () => {
			req.params = { id: '1' };
			req.body = { nome: 'Carlos' };
			const updated = { id: 1, nome: 'Carlos' };
			sandbox.stub(TutorService, 'update').returns(updated);

			tutorController.update(req, res);

			expect(res.json.calledWith(updated)).to.be.true;
		});

		it('deve retornar 404 quando o tutor a ser atualizado não for encontrado', () => {
			req.params = { id: '99' };
			req.body = { nome: 'Carlos' };
			sandbox.stub(TutorService, 'update').returns(null);

			tutorController.update(req, res);

			expect(res.status.calledWith(404)).to.be.true;
			expect(res.json.calledWith({ message: 'Tutor não encontrado' })).to.be.true;
		});
	});

	describe('remove', () => {
		it('deve remover o tutor quando encontrado', () => {
			req.params = { id: '1' };
			sandbox.stub(TutorService, 'remove').returns(true);

			tutorController.remove(req, res);

			expect(res.status.calledWith(204)).to.be.true;
			expect(res.send.calledOnce).to.be.true;
		});

		it('deve retornar 404 quando o tutor a ser removido não for encontrado', () => {
			req.params = { id: '99' };
			sandbox.stub(TutorService, 'remove').returns(false);

			tutorController.remove(req, res);

			expect(res.status.calledWith(404)).to.be.true;
			expect(res.json.calledWith({ message: 'Tutor não encontrado' })).to.be.true;
		});
	});

	describe('getAll', () => {
		it('deve retornar todos os tutores', () => {
			const tutors = [{ id: 1, nome: 'João' }, { id: 2, nome: 'Maria' }];
			sandbox.stub(TutorService, 'getAll').returns(tutors);

			tutorController.getAll(req, res);

			expect(res.json.calledWith(tutors)).to.be.true;
		});
	});
});