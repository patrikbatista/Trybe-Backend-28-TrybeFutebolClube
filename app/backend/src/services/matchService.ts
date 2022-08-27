import IMatch from '../interfaces/IMatch';
import Match from '../database/models/match';
import Team from '../database/models/team';

export default class MatchServices {
  private model;

  constructor(model = Match) {
    this.model = model;
  }

  public async getAll() : Promise<Match[]> {
    const matches = await this.model.findAll({ include: [
      {
        model: Team,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: Team,
        as: 'teamAway',
        attributes: ['teamName'],
      },
    ] });
    return matches;
  }

  public async getById(id: number) : Promise<Match | null> {
    const match = await this.model.findByPk(id, { include: [
      {
        model: Team,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: Team,
        as: 'teamAway',
        attributes: ['teamName'],
      },
    ] });
    return match;
  }

  public async getByProgress(inProgress: boolean) : Promise<Match[]> {
    const matches = await this.model.findAll({
      where: { inProgress },
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ] });
    return matches;
  }

  public async createMatch(match:IMatch): Promise<IMatch | null> {
    const home = await Team.findByPk(match.homeTeam);
    const away = await Team.findByPk(match.awayTeam);

    if (home && away) {
      const result = await this.model.create(match);
      return result;
    }

    return null;
  }

  public async updateMatch(match: IMatch): Promise<void> {
    await this.model.update(
      {
        homeTeam: match.homeTeam,
        homeTeamGoals: match.homeTeamGoals,
        awayTeam: match.awayTeam,
        awayTeamGoals: match.awayTeamGoals,
        inProgress: match.inProgress,
      },
      {
        where: { id: match.id },
      },
    );
  }
}
