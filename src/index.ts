import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(3000, () => console.log("Servidor iniciado na porta 3000!"));
