import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/loginServices';
import createToken from '../utils/createToken';

export default class LoginController {
  private loginService: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
    this.create = this.create.bind(this);
  }

  public async create(req: Request, res: Response, _next:NextFunction) {
    const { email, password } = req.body;

    const resLogin = await this.loginService.loginUser({ email, password });

    if (resLogin === null) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    if (resLogin === undefined) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const token = createToken({
      id: resLogin.id,
      username: resLogin.username,
      role: resLogin.role,
      email: resLogin.email,
    });

    res.status(200).json({ token });
  }

  public static validatedToken(req: Request, res: Response, _next:NextFunction) {
    const { user } = req.body;

    return res.status(200).json({ role: user.role });
  }
}
