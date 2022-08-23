import { Router, Request, Response } from 'express';
import LoginService from '../services/loginServices';
import LoginController from '../controllers/loginController';
import User from '../database/models/user';

export default class UserRouter {
  public router: Router;
  private endpoint: string;
  private service;
  private controller;

  constructor(endpoint: string) {
    this.router = Router();
    this.endpoint = endpoint;
    this.service = new LoginService(User);
    this.controller = new LoginController(this.service);
  }

  public addRoute() {
    this.router.post(`/${this.endpoint}`, this.controller.create);
    this.router.get(`/${this.endpoint}/validate`, (_req: Request, res: Response) => res.send('ok'));
  }
}
