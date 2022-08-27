import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/matchService';

export default class TeamController {
  private matchService: MatchService;

  constructor(matchService: MatchService) {
    this.matchService = matchService;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.createMatch = this.createMatch.bind(this);
    this.changeProgress = this.changeProgress.bind(this);
    this.updateMatch = this.updateMatch.bind(this);
  }

  public async getAll(req: Request, res: Response, _next:NextFunction) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const matches = await this.matchService.getAll();
      return res.status(200).json(matches);
    }
    let progress = false;

    if (inProgress === 'true') {
      progress = true;
    }
    const matches = await this.matchService.getByProgress(progress);
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

  public async createMatch(req: Request, res: Response, _next:NextFunction) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;

    const created = await this.matchService.createMatch(
      { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress },
    );

    if (created) {
      return res.status(201).json(created);
    }
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  public async changeProgress(req: Request, res: Response, _next:NextFunction) {
    const { id } = req.params;

    const match = await this.matchService.getById(Number(id));

    if (match !== null) {
      await this.matchService.updateMatch({
        id: match.id,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        homeTeamGoals: match.homeTeamGoals,
        awayTeamGoals: match.awayTeamGoals,
        inProgress: false,
      });
      return res.status(200).json({ message: 'Finished' });
    }

    return res.status(404).json({ message: 'Match not found' });
  }

  public async updateMatch(req: Request, res: Response, _next:NextFunction) {
    const { id } = req.params;

    const { homeTeamGoals, awayTeamGoals } = req.body;

    const match = await this.matchService.getById(Number(id));

    if (match !== null) {
      await this.matchService.updateMatch({
        id: match.id,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        homeTeamGoals,
        awayTeamGoals,
        inProgress: match.inProgress,
      });
      return res.status(200).json({ message: 'Match up' });
    }
    return res.status(404).json({ message: 'match not found' });
  }
}
