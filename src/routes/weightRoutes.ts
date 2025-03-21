import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createWeightRecord, getWeightRecords, getWeightRecordById, updateWeightRecord, deleteWeightRecord } from "../controllers/weightController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Registros de Peso
 *   description: Gerenciamento dos registros de peso dos usuários
 */

router.post("/weight", authMiddleware, createWeightRecord);

router.get("/weight", authMiddleware, getWeightRecords);

router.get("/weight/:id", authMiddleware, getWeightRecordById);

router.put("/weight/:id", authMiddleware, updateWeightRecord);

router.delete("/weight/:id", authMiddleware, deleteWeightRecord);

export default router;