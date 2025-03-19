import { Request, Response } from 'express';
import prisma from '../config/prismaClient';

export const createMedication = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, dosage, frequency, startDate, endDate } = req.body;

    const medication = await prisma.medication.create({
      data: {
        userId: req.user?.id as number,
        name,
        dosage,
        frequency,
        startDate,
        endDate,
      },
    });

    res.json(medication);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar medicamento' });
  }
};

export const getMedications = async (req: Request, res: Response): Promise<void> => {
  try {
    const medications = await prisma.medication.findMany({ where: { userId: req.user?.id } });
    res.json(medications);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar medicamentos' });
  }
};

export const getMedicationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const medication = await prisma.medication.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!medication) {
      res.status(404).json({ message: 'Medicamento não encontrado' });
      return;
    }

    res.json(medication);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar medicamento' });
  }
};

export const updateMedication = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedMedication = await prisma.medication.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });

    res.json(updatedMedication);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar medicamento' });
  }
};

export const deleteMedication = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.medication.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Medicamento removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover medicamento' });
  }
};
