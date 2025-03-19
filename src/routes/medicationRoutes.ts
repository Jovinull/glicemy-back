import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { createMedication, getMedications, getMedicationById, updateMedication, deleteMedication } from '../controllers/medicationController';

const router = Router();

router.post('/', authMiddleware, createMedication);
router.get('/', authMiddleware, getMedications);
router.get('/:id', authMiddleware, getMedicationById);
router.put('/:id', authMiddleware, updateMedication);
router.delete('/:id', authMiddleware, deleteMedication);

export default router;
