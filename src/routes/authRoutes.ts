import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { registerUser, loginUser, registerSupervisor } from '../controllers/authController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Rotas de autenticação de usuários e supervisores
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 */
router.post('/register', asyncHandler(registerUser));

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Fazer login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 */
router.post('/login', asyncHandler(loginUser));

/**
 * @swagger
 * /api/auth/register-supervisor:
 *   post:
 *     summary: Registrar um novo supervisor
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Supervisor registrado com sucesso
 */
router.post('/register-supervisor', asyncHandler(registerSupervisor));

export default router;
