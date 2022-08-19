import { DataTypes, Model } from 'sequelize';
// import IUser from '../../interfaces/IUser';
import dbSequelize from '.';
import Team from './team';

class Match extends Model {
  public id: number;
  public homeTeam: number;
  public homeTeamGoals: number;
  public awayTeam: number;
  public awayTeamGoals: number;
  public inProgress: boolean;
}

Match.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  homeTeam: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: Team,
      key: 'id',
    },
  },
  homeTeamGoals: { type: DataTypes.INTEGER, allowNull: false },
  awayTeam: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: Team,
      key: 'id',
    },
  },
  awayTeamGoals: { type: DataTypes.INTEGER, allowNull: false },
  inProgress: { type: DataTypes.BOOLEAN, allowNull: false },
}, {
  sequelize: dbSequelize,
  tableName: 'matches',
  timestamps: false,
  underscored: true,
  modelName: 'Match',
});

Match.hasOne(Team, { foreignKey: 'id', sourceKey: 'homeTeam', as: 'home' });
Match.hasOne(Team, { foreignKey: 'id', sourceKey: 'awayTeam', as: 'away' });

export default Match;
