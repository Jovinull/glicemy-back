import jwt from 'jsonwebtoken';

export function generateToken(id: number) {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
}
