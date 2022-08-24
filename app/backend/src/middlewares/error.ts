import { Request, Response, NextFunction } from 'express';
// import IError from '../interfaces/IError';

export default function handleError(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(error);
  return res.status(500).json({ message: 'erro interno' });
}
