import { Request, Response, NextFunction } from 'express';
import LeaderboardService from '../services/leaderboardServices';

export default class LeaderboardController {
  private leaderboardService: LeaderboardService;

  constructor(leaderboardService: LeaderboardService) {
    this.leaderboardService = leaderboardService;
    this.getLeaderboardHome = this.getLeaderboardHome.bind(this);
    this.getLeaderboardAway = this.getLeaderboardAway.bind(this);
    this.getLeaderboard = this.getLeaderboard.bind(this);
  }

  public async getLeaderboardHome(_req: Request, res: Response, _next:NextFunction) {
    const result = await this.leaderboardService.getLeaderboardHome();
    return res.status(200).json(result);
  }

  public async getLeaderboardAway(_req: Request, res: Response, _next:NextFunction) {
    const result = await this.leaderboardService.getLeaderboardAway();
    return res.status(200).json(result);
  }

  public async getLeaderboard(_req: Request, res: Response, _next:NextFunction) {
    const resultAway = await this.leaderboardService.getLeaderboardAway();
    const resultHome = await this.leaderboardService.getLeaderboardHome();
    const result = LeaderboardService.getLeaderboard(resultAway, resultHome);
    return res.status(200).json(result);
  }
}
