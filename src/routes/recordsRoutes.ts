import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { createGlycemiaRecord, getGlycemiaRecords, getGlycemiaRecordById, updateGlycemiaRecord, deleteGlycemiaRecord } from '../controllers/recordsController';

const router = Router();

router.post('/glycemia', authMiddleware, createGlycemiaRecord);
router.get('/glycemia', authMiddleware, getGlycemiaRecords);
router.get('/glycemia/:id', authMiddleware, getGlycemiaRecordById);
router.put('/glycemia/:id', authMiddleware, updateGlycemiaRecord);
router.delete('/glycemia/:id', authMiddleware, deleteGlycemiaRecord);

export default router;
