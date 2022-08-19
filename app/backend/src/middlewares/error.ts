import { Request, Response, NextFunction } from 'express';
import IError from '../interfaces/IError';

export default (error: IError, _req: Request, res: Response, _next: NextFunction) => {
  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }
  console.error(error);
  return res.status(500).json({ message: 'erro interno' });
};
