import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { createGlycemiaRecord, getGlycemiaRecords, getGlycemiaRecordById, updateGlycemiaRecord, deleteGlycemiaRecord } from '../controllers/recordsController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Registros de Glicemia
 *   description: Gerenciamento dos registros de glicemia dos usuários
 */

/**
 * @swagger
 * /api/records/glycemia:
 *   post:
 *     summary: Criar um novo registro de glicemia
 *     tags: [Registros de Glicemia]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: number
 *                 description: Valor da glicemia medida
 *     responses:
 *       201:
 *         description: Registro de glicemia criado com sucesso
 */
router.post('/glycemia', authMiddleware, createGlycemiaRecord);

/**
 * @swagger
 * /api/records/glycemia:
 *   get:
 *     summary: Obter todos os registros de glicemia do usuário autenticado
 *     tags: [Registros de Glicemia]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de registros retornada com sucesso
 */
router.get('/glycemia', authMiddleware, getGlycemiaRecords);

/**
 * @swagger
 * /api/records/glycemia/{id}:
 *   get:
 *     summary: Obter um registro de glicemia pelo ID
 *     tags: [Registros de Glicemia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do registro de glicemia a ser buscado
 *     responses:
 *       200:
 *         description: Registro de glicemia retornado com sucesso
 */
router.get('/glycemia/:id', authMiddleware, getGlycemiaRecordById);

/**
 * @swagger
 * /api/records/glycemia/{id}:
 *   put:
 *     summary: Atualizar um registro de glicemia pelo ID
 *     tags: [Registros de Glicemia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do registro a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: number
 *                 description: Novo valor da glicemia
 *     responses:
 *       200:
 *         description: Registro de glicemia atualizado com sucesso
 */
router.put('/glycemia/:id', authMiddleware, updateGlycemiaRecord);

/**
 * @swagger
 * /api/records/glycemia/{id}:
 *   delete:
 *     summary: Deletar um registro de glicemia pelo ID
 *     tags: [Registros de Glicemia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do registro a ser deletado
 *     responses:
 *       200:
 *         description: Registro de glicemia deletado com sucesso
 */
router.delete('/glycemia/:id', authMiddleware, deleteGlycemiaRecord);

export default router;
