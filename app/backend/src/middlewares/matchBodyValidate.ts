import { Request, Response, NextFunction } from 'express';

export default class matchBodyValidate {
  public static validadeTeamIds(req: Request, res: Response, next:NextFunction) {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === ''
      || awayTeam === ''
      || homeTeam === undefined
      || awayTeam === undefined) {
      return res
        .status(401)
        .json({ message: 'Teams id is required' });
    }

    req.body = {
      ...req.body,
      homeTeam: Number(homeTeam),
      awayTeam: Number(awayTeam),
    };

    return next();
  }

  public static validateTeamsEquals(req: Request, res: Response, next:NextFunction) {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      return res
        .status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    next();
  }

  public static validadeGoalsTeam(req: Request, res: Response, next:NextFunction) {
    const { homeTeamGoals, awayTeamGoals } = req.body;

    if (homeTeamGoals === ''
      || awayTeamGoals === ''
      || homeTeamGoals === undefined
      || awayTeamGoals === undefined) {
      return res.status(401).json({ message: 'Goals is required' });
    }

    req.body = {
      ...req.body,
      homeTeamGoals: Number(homeTeamGoals),
      awayTeamGoals: Number(awayTeamGoals),
    };

    return next();
  }

  public static validadeInProgress(req: Request, _res: Response, next:NextFunction) {
    let { inProgress } = req.body;

    if (inProgress === undefined) {
      inProgress = true;
    }

    req.body = { ...req.body, inProgress };

    return next();
  }
}
