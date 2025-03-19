import { Request, Response } from 'express';
import prisma from '../config/prismaClient';

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const user = await prisma.user.findUnique({ where: { id: Number(req.params.id) } });
  if (!user) {
    res.status(404).json({ message: 'Usuário não encontrado' });
    return;
  }
  res.json(user);
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const updatedUser = await prisma.user.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(updatedUser);
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  await prisma.user.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: 'Usuário removido com sucesso' });
};
