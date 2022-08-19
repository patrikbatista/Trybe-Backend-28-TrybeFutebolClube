import { DataTypes, Model } from 'sequelize';
import dbSequelize from '.';

class Team extends Model {
  public id: number;
  public teamName: string;
}

Team.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  teamName: { type: DataTypes.STRING(128), allowNull: false },
}, {
  sequelize: dbSequelize,
  tableName: 'teams',
  timestamps: false,
  underscored: true,
  modelName: 'Team',
});
export default Team;
