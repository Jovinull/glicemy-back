import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { createReminder, getReminders, getReminderById, updateReminder, deleteReminder } from '../controllers/reminderController';

const router = Router();

router.post('/', authMiddleware, createReminder);
router.get('/', authMiddleware, getReminders);
router.get('/:id', authMiddleware, getReminderById);
router.put('/:id', authMiddleware, updateReminder);
router.delete('/:id', authMiddleware, deleteReminder);

export default router;
