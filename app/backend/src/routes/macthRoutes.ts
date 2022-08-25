import { Router } from 'express';
import Match from '../database/models/match';
import MatchService from '../services/matchService';
import MatchController from '../controllers/matchController';

export default class UserRouter {
  public router: Router;
  private endpoint: string;
  private service;
  private controller;

  constructor(endpoint: string) {
    this.router = Router();
    this.endpoint = endpoint;

    this.service = new MatchService(Match);
    this.controller = new MatchController(this.service);
  }

  public addRoute() {
    this.router.get(`/${this.endpoint}`, this.controller.getAll);
    this.router.get(
      `/${this.endpoint}/:id`,
      this.controller.getById,
    );
  }
}
