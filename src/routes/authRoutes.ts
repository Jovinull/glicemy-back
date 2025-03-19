import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { registerUser, loginUser, registerSupervisor } from '../controllers/authController';

const router = Router();

// Rotas Usuário
router.post('/register', asyncHandler(registerUser));
router.post('/login', asyncHandler(loginUser));

// Rota Supervisor
router.post('/register-supervisor', asyncHandler(registerSupervisor));

export default router;
