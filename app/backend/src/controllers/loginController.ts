import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/loginServices';
import createToken from '../utils/createToken';

const ERROR_INVALID_FIELDS = {
  status: 400,
  message: 'All fields must be filled',
};

const ERROR_USER_NOT_FOUND = {
  status: 404,
  message: 'not found',
};

const ERROR_INVALID_PASSWORD = {
  status: 400,
  message: 'invalid password',
};

export default class LoginController {
  private loginService: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
    this.create = this.create.bind(this);
  }

  public async create(req: Request, res: Response, next:NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(ERROR_INVALID_FIELDS);
    }

    const resLogin = await this.loginService.loginUser({ email, password });

    if (resLogin === null) {
      return next(ERROR_USER_NOT_FOUND);
    }

    if (resLogin === undefined) {
      return next(ERROR_INVALID_PASSWORD);
    }

    const token = createToken({
      id: resLogin.id,
      username: resLogin.username,
      role: resLogin.role,
      email: resLogin.email,
    });

    res.status(200).json({ token });
  }
}
