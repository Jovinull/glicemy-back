import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import supervisorRoutes from './routes/supervisorRoutes';
import recordsRoutes from './routes/recordsRoutes';
import medicationRoutes from './routes/medicationRoutes';
import reminderRoutes from './routes/reminderRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/supervisors', supervisorRoutes);
app.use('/api/records', recordsRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/reminders', reminderRoutes);


// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}!`));
