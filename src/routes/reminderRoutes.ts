import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { createReminder, getReminders, getReminderById, updateReminder, deleteReminder } from '../controllers/reminderController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Lembretes
 *   description: Gerenciamento de alertas e lembretes para medicamentos e medições de glicose
 */

/**
 * @swagger
 * /api/reminders:
 *   post:
 *     summary: Criar um novo lembrete
 *     tags: [Lembretes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               medicationId:
 *                 type: integer
 *                 description: ID do medicamento relacionado ao lembrete (opcional)
 *               message:
 *                 type: string
 *                 description: Mensagem do lembrete
 *               remindAt:
 *                 type: string
 *                 format: date-time
 *                 description: Data e horário do lembrete
 *     responses:
 *       201:
 *         description: Lembrete criado com sucesso
 */
router.post('/', authMiddleware, createReminder);

/**
 * @swagger
 * /api/reminders:
 *   get:
 *     summary: Obter todos os lembretes do usuário autenticado
 *     tags: [Lembretes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de lembretes retornada com sucesso
 */
router.get('/', authMiddleware, getReminders);

/**
 * @swagger
 * /api/reminders/{id}:
 *   get:
 *     summary: Obter um lembrete pelo ID
 *     tags: [Lembretes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do lembrete a ser buscado
 *     responses:
 *       200:
 *         description: Lembrete retornado com sucesso
 */
router.get('/:id', authMiddleware, getReminderById);

/**
 * @swagger
 * /api/reminders/{id}:
 *   put:
 *     summary: Atualizar um lembrete pelo ID
 *     tags: [Lembretes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do lembrete a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Nova mensagem do lembrete
 *               remindAt:
 *                 type: string
 *                 format: date-time
 *                 description: Novo horário do lembrete
 *     responses:
 *       200:
 *         description: Lembrete atualizado com sucesso
 */
router.put('/:id', authMiddleware, updateReminder);

/**
 * @swagger
 * /api/reminders/{id}:
 *   delete:
 *     summary: Deletar um lembrete pelo ID
 *     tags: [Lembretes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do lembrete a ser deletado
 *     responses:
 *       200:
 *         description: Lembrete deletado com sucesso
 */
router.delete('/:id', authMiddleware, deleteReminder);

export default router;
