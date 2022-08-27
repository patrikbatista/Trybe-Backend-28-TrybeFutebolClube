import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import verifyToken from '../utils/verifyToken';

export default class LoginBodyValidate {
  public static validateLogin(req: Request, res: Response, next:NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Field email invalid' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Field password invalid' });
    }
    return next();
  }

  public static tokenValidate(req: Request, res: Response, next:NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const user = verifyToken(authorization);
    if (!user) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    req.body.user = user;
    next();
  }
}
