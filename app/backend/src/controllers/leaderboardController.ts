import { Request, Response, NextFunction } from 'express';
import LeaderboardService from '../services/leaderboardServices';

export default class LeaderboardController {
  private leaderboardService: LeaderboardService;

  constructor(leaderboardService: LeaderboardService) {
    this.leaderboardService = leaderboardService;
    this.getLeaderboardHome = this.getLeaderboardHome.bind(this);
  }

  public async getLeaderboardHome(_req: Request, res: Response, _next:NextFunction) {
    const result = await this.leaderboardService.getLeaderboardHome();
    return res.status(200).json(result);
  }
}
