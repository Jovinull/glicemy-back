import { Request, Response } from 'express';

export const asyncHandler = (fn: (req: Request, res: Response) => Promise<Response | void>) => 
  (req: Request, res: Response) => {
    fn(req, res).catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    });
};
