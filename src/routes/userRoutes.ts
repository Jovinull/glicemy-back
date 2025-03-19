import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';

const router = Router();

router.get('/', authMiddleware, getUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

export default router;
