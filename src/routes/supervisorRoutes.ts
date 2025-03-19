import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getSupervisors, getSupervisorById, updateSupervisor, deleteSupervisor } from '../controllers/supervisorController';

const router = Router();

router.get('/', authMiddleware, getSupervisors);
router.get('/:id', authMiddleware, getSupervisorById);
router.put('/:id', authMiddleware, updateSupervisor);
router.delete('/:id', authMiddleware, deleteSupervisor);

export default router;
