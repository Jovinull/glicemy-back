import { Request, Response } from 'express';
import prisma from '../config/prismaClient';

export const createGlycemiaRecord = async (req: Request, res: Response): Promise<void> => {
  const { value } = req.body;
  const record = await prisma.glycemiaRecord.create({
    data: { userId: req.user?.id as number, value },
  });
  res.json(record);
};

export const getGlycemiaRecords = async (req: Request, res: Response): Promise<void> => {
  const records = await prisma.glycemiaRecord.findMany({ 
    where: { userId: req.user?.id }, 
    orderBy: { timestamp: 'desc' }
  });

  res.json(records);
};

export const getGlycemiaRecordById = async (req: Request, res: Response): Promise<void> => {
  const record = await prisma.glycemiaRecord.findUnique({ where: { id: Number(req.params.id) } });
  if (!record) {
    res.status(404).json({ message: 'Registro não encontrado' });
    return;
  }
  res.json(record);
};

export const updateGlycemiaRecord = async (req: Request, res: Response): Promise<void> => {
  const updatedRecord = await prisma.glycemiaRecord.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(updatedRecord);
};

export const deleteGlycemiaRecord = async (req: Request, res: Response): Promise<void> => {
  await prisma.glycemiaRecord.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: 'Registro removido' });
};

export const createGlycatedHemoglobinRecord = async (req: Request, res: Response): Promise<void> => {
  const { percentage } = req.body;
  const record = await prisma.glycatedHemoglobinRecord.create({
    data: { userId: req.user?.id as number, percentage
      
     },
  });
  res.json(record);
};

export const getGlycatedHemoglobinRecords = async (req: Request, res: Response): Promise<void> => {
  const records = await prisma.glycatedHemoglobinRecord.findMany({ 
    where: { userId: req.user?.id }, 
    orderBy: { timestamp: 'desc' }
  });

  res.json(records);
};

export const getGlycatedHemoglobinRecordById = async (req: Request, res: Response): Promise<void> => {
  const record = await prisma.glycatedHemoglobinRecord.findUnique({ where: { id: Number(req.params.id) } });
  if (!record) {
    res.status(404).json({ message: 'Registro não encontrado' });
    return;
  }
  res.json(record);
};

export const updateGlycatedHemoglobinRecord = async (req: Request, res: Response): Promise<void> => {
  const updatedRecord = await prisma.glycatedHemoglobinRecord.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(updatedRecord);
};

export const deleteGlycatedHemoglobinRecord = async (req: Request, res: Response): Promise<void> => {
  await prisma.glycatedHemoglobinRecord.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: 'Registro removido' });
};