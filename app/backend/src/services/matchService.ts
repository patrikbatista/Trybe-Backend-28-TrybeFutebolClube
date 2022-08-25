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
    const match = await this.model.findByPk(id);
    return match;
  }
}
