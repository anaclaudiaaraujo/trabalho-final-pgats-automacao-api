const express = require('express');
const router = express.Router();
const prontuarioController = require('../controllers/prontuarioController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Prontuarios
 *   description: Operações sobre prontuários
 */

/**
 * @swagger
 * /prontuarios:
 *   get:
 *     tags:
 *       - Prontuarios
 *     summary: Listar todos os prontuários
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de prontuários
 */
// Apenas veterinários podem acessar as rotas de prontuário
router.get('/', verifyToken, checkRole(['veterinario']), prontuarioController.getAll);

/**
 * @swagger
 * /prontuarios/{id}:
 *   get:
 *     tags:
 *       - Prontuarios
 *     summary: Obter prontuário por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Prontuário encontrado
 *       404:
 *         description: Prontuário não encontrado
 */
router.get('/:id', prontuarioController.getById);

/**
 * @swagger
 * /prontuarios:
 *   post:
 *     tags:
 *       - Prontuarios
 *     summary: Criar um novo prontuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dataAtendimento:
 *                 type: string
 *               descricao:
 *                 type: string
 *               tratamento:
 *                 type: string
 *               exames:
 *                 type: string
 *               animalId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Prontuário criado
 *       400:
 *         description: Animal não encontrado
 */
router.post('/', verifyToken, checkRole(['veterinario']), prontuarioController.create);

/**
 * @swagger
 * /prontuarios/{id}:
 *   put:
 *     tags:
 *       - Prontuarios
 *     summary: Atualizar um prontuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *               tratamento:
 *                 type: string
 *               exames:
 *                 type: string
 *     responses:
 *       200:
 *         description: Prontuário atualizado
 *       404:
 *         description: Prontuário não encontrado
 */
router.put('/:id', prontuarioController.update);

/**
 * @swagger
 * /prontuarios/{id}:
 *   delete:
 *     tags:
 *       - Prontuarios
 *     summary: Remover um prontuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Prontuário removido
 *       404:
 *         description: Prontuário não encontrado
 */
router.delete('/:id', verifyToken, checkRole(['administrador']), prontuarioController.remove);

module.exports = router;
