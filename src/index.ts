import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes'; // ✅ Agora funcionará corretamente

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rotas
app.use('/api/auth', authRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}!`));
