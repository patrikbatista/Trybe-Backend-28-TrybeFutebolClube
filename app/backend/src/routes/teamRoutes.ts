import { Router } from 'express';
import Team from '../database/models/team';
import TeamService from '../services/teamService';
import TeamController from '../controllers/teamsControllers';

export default class UserRouter {
  public router: Router;
  private endpoint: string;
  private service;
  private controller;

  constructor(endpoint: string) {
    this.router = Router();
    this.endpoint = endpoint;

    this.service = new TeamService(Team);
    this.controller = new TeamController(this.service);
  }

  public addRoute() {
    this.router.get(`/${this.endpoint}`, this.controller.getAll);
    this.router.get(
      `/${this.endpoint}/:id`,
      this.controller.getById,
    );
  }
}
