import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { createMedication, getMedications, getMedicationById, updateMedication, deleteMedication } from '../controllers/medicationController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Medicamentos
 *   description: Gerenciamento de medicamentos dos usuários
 */

/**
 * @swagger
 * /api/medications:
 *   post:
 *     summary: Criar um novo medicamento
 *     tags: [Medicamentos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               dosage:
 *                 type: string
 *               frequency:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Medicamento criado com sucesso
 */
router.post('/', authMiddleware, createMedication);

/**
 * @swagger
 * /api/medications:
 *   get:
 *     summary: Obter todos os medicamentos do usuário autenticado
 *     tags: [Medicamentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de medicamentos retornada com sucesso
 */
router.get('/', authMiddleware, getMedications);

/**
 * @swagger
 * /api/medications/{id}:
 *   get:
 *     summary: Obter um medicamento pelo ID
 *     tags: [Medicamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do medicamento a ser buscado
 *     responses:
 *       200:
 *         description: Medicamento retornado com sucesso
 */
router.get('/:id', authMiddleware, getMedicationById);

/**
 * @swagger
 * /api/medications/{id}:
 *   put:
 *     summary: Atualizar um medicamento pelo ID
 *     tags: [Medicamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do medicamento a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               dosage:
 *                 type: string
 *               frequency:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Medicamento atualizado com sucesso
 */
router.put('/:id', authMiddleware, updateMedication);

/**
 * @swagger
 * /api/medications/{id}:
 *   delete:
 *     summary: Deletar um medicamento pelo ID
 *     tags: [Medicamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do medicamento a ser deletado
 *     responses:
 *       200:
 *         description: Medicamento deletado com sucesso
 */
router.delete('/:id', authMiddleware, deleteMedication);

export default router;
