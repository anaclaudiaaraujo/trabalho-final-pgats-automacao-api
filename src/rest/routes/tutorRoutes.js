const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Tutores
 *   description: Operações sobre tutores
 */

/**
 * @swagger
 * /tutores:
 *   get:
 *     tags: [Tutores]
 *     summary: Listar todos os tutores
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tutores
 */
router.get('/', verifyToken, tutorController.getAll);

/**
 * @swagger
 * /tutores/{id}:
 *   get:
 *     tags: [Tutores]
 *     summary: Obter tutor por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tutor encontrado
 *       404:
 *         description: Tutor não encontrado
 */
router.get('/:id', verifyToken, tutorController.getById);

/**
 * @swagger
 * /tutores:
 *   post:
 *     tags: [Tutores]
 *     summary: Criar um novo tutor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tutor criado
 */
router.post('/', verifyToken, checkRole(['recepcionista']), tutorController.create);

/**
 * @swagger
 * /tutores/{id}:
 *   put:
 *     tags: [Tutores]
 *     summary: Atualizar um tutor
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
 *     responses:
 *       200:
 *         description: Tutor atualizado
 *       404:
 *         description: Tutor não encontrado
 */
router.put('/:id', verifyToken, checkRole(['recepcionista']), tutorController.update);

/**
 * @swagger
 * /tutores/{id}:
 *   delete:
 *     tags: [Tutores]
 *     summary: Remover um tutor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tutor removido
 *       404:
 *         description: Tutor não encontrado
 */
router.delete('/:id', verifyToken, checkRole(['administrador']), tutorController.remove);

module.exports = router;
