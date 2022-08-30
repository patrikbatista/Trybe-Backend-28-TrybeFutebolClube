import { Router } from 'express';
import Match from '../database/models/match';
import Team from '../database/models/team';
import LeaderboardService from '../services/leaderboardServices';
import LeaderboardController from '../controllers/leaderboardController';

export default class Leaderboard {
  public router: Router;
  private endpoint: string;
  private service;
  private controller;

  constructor(endpoint: string) {
    this.router = Router();
    this.endpoint = endpoint;

    this.service = new LeaderboardService(Team, Match);
    this.controller = new LeaderboardController(this.service);
  }

  public addRoute() {
    // this.router
    //   .get(`/${this.endpoint}`, (_req: Request, res: Response) => res.status(200).send('ok'));
    this.router
      .get(`/${this.endpoint}/home`, this.controller.getLeaderboardHome);
    // this.router
    //   .get(`/${this.endpoint}/away`, (_req: Request, res: Response) => res.status(200).send('ok'));
  }
}
