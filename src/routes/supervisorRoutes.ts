import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getSupervisors, getSupervisorById, updateSupervisor, deleteSupervisor } from '../controllers/supervisorController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Supervisores
 *   description: Gerenciamento de supervisores no sistema
 */

/**
 * @swagger
 * /api/supervisors:
 *   get:
 *     summary: Obter todos os supervisores
 *     tags: [Supervisores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de supervisores retornada com sucesso
 */
router.get('/', authMiddleware, getSupervisors);

/**
 * @swagger
 * /api/supervisors/{id}:
 *   get:
 *     summary: Obter um supervisor pelo ID
 *     tags: [Supervisores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do supervisor a ser buscado
 *     responses:
 *       200:
 *         description: Supervisor retornado com sucesso
 */
router.get('/:id', authMiddleware, getSupervisorById);

/**
 * @swagger
 * /api/supervisors/{id}:
 *   put:
 *     summary: Atualizar um supervisor pelo ID
 *     tags: [Supervisores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do supervisor a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Novo nome do supervisor
 *     responses:
 *       200:
 *         description: Supervisor atualizado com sucesso
 */
router.put('/:id', authMiddleware, updateSupervisor);

/**
 * @swagger
 * /api/supervisors/{id}:
 *   delete:
 *     summary: Deletar um supervisor pelo ID
 *     tags: [Supervisores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do supervisor a ser deletado
 *     responses:
 *       200:
 *         description: Supervisor deletado com sucesso
 */
router.delete('/:id', authMiddleware, deleteSupervisor);

export default router;
