import { Router } from 'express';
import LoginBodyValidate from '../middlewares/loginBodyValidate';
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
    this.router.post(`/${this.endpoint}`, LoginBodyValidate.validateLogin, this.controller.create);
    this.router.get(
      `/${this.endpoint}/validate`,
      LoginBodyValidate.tokenValidate,
      LoginController.validatedToken,
    );
  }
}
