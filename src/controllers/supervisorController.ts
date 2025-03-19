import { Request, Response } from 'express';
import prisma from '../config/prismaClient';

export const getSupervisors = async (_req: Request, res: Response): Promise<void> => {
  const supervisors = await prisma.supervisor.findMany();
  res.json(supervisors);
};

export const getSupervisorById = async (req: Request, res: Response): Promise<void> => {
  const supervisor = await prisma.supervisor.findUnique({ where: { id: Number(req.params.id) } });
  if (!supervisor) {
    res.status(404).json({ message: 'Supervisor não encontrado' });
    return;
  }
  res.json(supervisor);
};

export const updateSupervisor = async (req: Request, res: Response): Promise<void> => {
  const updatedSupervisor = await prisma.supervisor.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(updatedSupervisor);
};

export const deleteSupervisor = async (req: Request, res: Response): Promise<void> => {
  await prisma.supervisor.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: 'Supervisor removido com sucesso' });
};
