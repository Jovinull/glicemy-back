import { Request, Response } from 'express';
import prisma from '../config/prismaClient';

export const createReminder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { medicationId, message, remindAt } = req.body;

    const reminder = await prisma.reminder.create({
      data: {
        userId: req.user?.id as number,
        medicationId,
        message,
        remindAt,
      },
    });

    res.json(reminder);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar lembrete' });
  }
};

export const getReminders = async (req: Request, res: Response): Promise<void> => {
  try {
    const reminders = await prisma.reminder.findMany({ where: { userId: req.user?.id } });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar lembretes' });
  }
};

export const getReminderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const reminder = await prisma.reminder.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!reminder) {
      res.status(404).json({ message: 'Lembrete não encontrado' });
      return;
    }

    res.json(reminder);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar lembrete' });
  }
};

export const updateReminder = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedReminder = await prisma.reminder.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });

    res.json(updatedReminder);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar lembrete' });
  }
};

export const deleteReminder = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.reminder.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Lembrete removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover lembrete' });
  }
};
