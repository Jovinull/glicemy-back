import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../config/prismaClient';
import { generateToken } from '../utils/generateToken';

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(400).json({ message: 'Email já cadastrado.' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });

  res.json({ id: user.id, email: user.email, name: user.name, token: generateToken(user.id) });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ message: 'Usuário não encontrado.' });

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return res.status(400).json({ message: 'Senha incorreta.' });

  res.json({ id: user.id, email: user.email, name: user.name, token: generateToken(user.id) });
};

export const registerSupervisor = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const existingSupervisor = await prisma.supervisor.findUnique({ where: { email } });
  if (existingSupervisor) return res.status(400).json({ message: 'Email já cadastrado.' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const supervisor = await prisma.supervisor.create({
    data: { email, password: hashedPassword, name },
  });

  res.json({ id: supervisor.id, email: supervisor.email, name: supervisor.name });
};
