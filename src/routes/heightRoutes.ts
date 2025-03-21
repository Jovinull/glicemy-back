import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createHeightRecord, getHeightRecords, getHeightRecordById, updateHeightRecord, deleteHeightRecord } from "../controllers/heightController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Registros de Altura
 *   description: Gerenciamento dos registros de altura dos usuários
 */

router.post("/height", authMiddleware, createHeightRecord);

router.get("/height", authMiddleware, getHeightRecords);

router.get("/height/:id", authMiddleware, getHeightRecordById);

router.put("/height/:id", authMiddleware, updateHeightRecord);

router.delete("/height/:id", authMiddleware, deleteHeightRecord);

export default router;