import { Request, Response } from "express";
import prisma from "../config/prismaClient";

export const createWeightRecord = async (req: Request, res: Response): Promise<void> => {
  const { weight } = req.body;
  const record = await prisma.weightRecord.create({
    data: { userId: req.user?.id as number, weight },
  });

  res.json(record);
}

export const getWeightRecords = async (req: Request, res: Response): Promise<void> => {
  const records = await prisma.weightRecord.findMany({ 
    where: { userId: req.user?.id }, 
    orderBy: { timestamp: 'desc' }
  });

  res.json(records);
}

export const getWeightRecordById = async (req: Request, res: Response): Promise<void> => {
  const record = await prisma.weightRecord.findUnique({ where: { id: Number(req.params.id) }});
  if (!record) {
    res.status(404).json({ message: "Registro não encontrado" });
    return;
  }
  res.json(record);
}

export const updateWeightRecord = async (req: Request, res: Response): Promise<void> => {
  const updatedRecord = await prisma.weightRecord.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });

  res.json(updatedRecord);
}

export const deleteWeightRecord = async (req: Request, res: Response): Promise<void> => {
  await prisma.weightRecord.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: "Registro removido" });
}