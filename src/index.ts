import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import supervisorRoutes from './routes/supervisorRoutes';
import recordsRoutes from './routes/recordsRoutes';
import medicationRoutes from './routes/medicationRoutes';
import reminderRoutes from './routes/reminderRoutes';
import weightRoutes from './routes/weightRoutes';
import heightRoutes from './routes/heightRoutes';
import { securityMiddleware } from './middleware/securityMiddleware';
import { setupSwagger } from './config/swagger';

dotenv.config();

const app = express();

// Middleware de Segurança
securityMiddleware(app);

app.use(express.json());
app.use(cors());

setupSwagger(app);

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/supervisors', supervisorRoutes);
app.use('/api/records', recordsRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/weights', weightRoutes);
app.use('/api/heights', heightRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}!`));
