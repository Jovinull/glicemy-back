import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/prismaClient';

interface JwtPayload {
  id: number;
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Token não fornecido.' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      res.status(401).json({ message: 'Usuário inválido.' });
      return;
    }

    req.user = user; // ✅ Agora `req.user` é reconhecido corretamente.
    next(); // ✅ Chamamos `next()` corretamente
  } catch (error) {
    res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
}
