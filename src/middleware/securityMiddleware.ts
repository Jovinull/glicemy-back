import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Express } from 'express';

// Proteção contra ataques com headers seguros
export const securityMiddleware = (app: Express) => {
  app.use(helmet());

  // Rate limiting: Limita requisições de um mesmo IP
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de 100 requisições por IP
    message: 'Muitas requisições. Tente novamente mais tarde.',
  });

  app.use(limiter);
};
