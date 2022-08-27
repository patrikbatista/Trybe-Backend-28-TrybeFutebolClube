import { Router } from 'express';
import MatchBodyValidate from '../middlewares/matchBodyValidate';
import Match from '../database/models/match';
import MatchService from '../services/matchService';
import MatchController from '../controllers/matchController';
import LoginBodyValidate from '../middlewares/loginBodyValidate';

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
    this.router.get(`/${this.endpoint}/:id`, this.controller.getById);
    this.router.use(`/${this.endpoint}`, LoginBodyValidate.tokenValidate);
    this.router.post(
      `/${this.endpoint}`,
      MatchBodyValidate.validadeTeamIds,
      MatchBodyValidate.validateTeamsEquals,
      MatchBodyValidate.validadeGoalsTeam,
      MatchBodyValidate.validadeInProgress,
      this.controller.createMatch,
    );
    this.router.patch(
      `/${this.endpoint}/:id`,
      MatchBodyValidate.validadeGoalsTeam,
      this.controller.updateMatch,
    );
    this.router.patch(`/${this.endpoint}/:id/finish`, this.controller.changeProgress);
  }
}
