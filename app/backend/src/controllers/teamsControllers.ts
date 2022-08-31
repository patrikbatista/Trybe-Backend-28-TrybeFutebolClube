import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/teamService';

export default class TeamController {
  private teamService: TeamService;

  constructor(teamService: TeamService) {
    this.teamService = teamService;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
  }

  public async getAll(req: Request, res: Response, _next:NextFunction) {
    const teams = await this.teamService.getAll();
    res.status(200).json(teams);
  }

  public async getById(req: Request, res: Response, _next:NextFunction) {
    const { id } = req.params;
    const team = await this.teamService.getById(Number(id));
    if (team !== null) {
      return res.status(200).json(team);
    }
    return res.status(404).json({ message: 'Team not found' });
  }
}
