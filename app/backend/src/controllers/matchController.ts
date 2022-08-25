import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/matchService';

export default class TeamController {
  private matchService: MatchService;

  constructor(matchService: MatchService) {
    this.matchService = matchService;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
  }

  public async getAll(req: Request, res: Response, _next:NextFunction) {
    const matches = await this.matchService.getAll();
    res.status(200).json(matches);
  }

  public async getById(req: Request, res: Response, _next:NextFunction) {
    const { id } = req.params;
    if (id !== undefined) {
      const match = await this.matchService.getById(Number(id));
      if (match !== null) {
        return res.status(200).json(match);
      }
      return res.status(404).json({ message: 'Match not found' });
    }
    return res.status(401).json({ message: 'id is required' });
  }
}
