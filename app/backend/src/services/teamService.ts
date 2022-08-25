import Team from '../database/models/team';

export default class TeamServices {
  private model;

  constructor(model = Team) {
    this.model = model;
  }

  public async getAll() : Promise<Team[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  public async getById(id: number) : Promise<Team | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}
