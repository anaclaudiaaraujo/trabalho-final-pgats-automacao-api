const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Animais
 *   description: Operações sobre animais
 */

/**
 * @swagger
 * /animais:
 *   get:
 *     tags: [Animais]
 *     summary: Listar todos os animais
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de animais
 */
router.get('/', verifyToken, animalController.getAll);

/**
 * @swagger
 * /animais/{id}:
 *   get:
 *     tags: [Animais]
 *     summary: Obter animal por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Animal encontrado
 *       404:
 *         description: Animal não encontrado
 */
router.get('/:id', verifyToken, animalController.getById);

/**
 * @swagger
 * /animais:
 *   post:
 *     tags: [Animais]
 *     summary: Criar um novo animal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               especie:
 *                 type: string
 *               raca:
 *                 type: string
 *               dataNascimento:
 *                 type: string
 *               tutorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Animal criado
 *       400:
 *         description: Tutor não encontrado
 */
router.post('/', verifyToken, checkRole(['recepcionista', 'veterinario']), animalController.create);

/**
 * @swagger
 * /animais/{id}:
 *   put:
 *     tags: [Animais]
 *     summary: Atualizar um animal
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
 *         description: Animal atualizado
 *       404:
 *         description: Animal não encontrado
 */
router.put('/:id', verifyToken, checkRole(['recepcionista', 'veterinario']), animalController.update);

/**
 * @swagger
 * /animais/{id}:
 *   delete:
 *     tags: [Animais]
 *     summary: Remover um animal
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Animal removido
 *       404:
 *         description: Animal não encontrado
 */
router.delete('/:id', verifyToken, checkRole(['administrador']), animalController.remove);

module.exports = router;
