import { Request, Response } from "express";
import prisma from "../config/prismaClient";

export const createHeightRecord = async (req: Request, res: Response): Promise<void> => {
  const { height } = req.body;
  const record = await prisma.heightRecord.create({
    data: { userId: req.user?.id as number, height },
  });

  res.json(record);
}

export const getHeightRecords = async (req: Request, res: Response): Promise<void> => {
  const records = await prisma.heightRecord.findMany({ 
    where: { userId: req.user?.id }, 
    orderBy: { timestamp: 'desc' }
  });

  res.json(records);
}

export const getHeightRecordById = async (req: Request, res: Response): Promise<void> => {
  const record = await prisma.heightRecord.findUnique({ where: { id: Number(req.params.id) }});
  if (!record) {
    res.status(404).json({ message: "Registro não encontrado" });
    return;
  }
  res.json(record);
}

export const updateHeightRecord = async (req: Request, res: Response): Promise<void> => {
  const updatedRecord = await prisma.heightRecord.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });

  res.json(updatedRecord);
}

export const deleteHeightRecord = async (req: Request, res: Response): Promise<void> => {
  await prisma.heightRecord.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: "Registro removido" });
}