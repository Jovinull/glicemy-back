import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Configuração da chave secreta
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default_encryption_key_32_characters_long!';
const IV_LENGTH = 16; // Tamanho do vetor de inicialização (IV)

// Função para criptografar dados
export const encryptData = (text: string): string => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
};

// Função para descriptografar dados
export const decryptData = (text: string): string => {
  const [iv, encryptedText] = text.split(':');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
