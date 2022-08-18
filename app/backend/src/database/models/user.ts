import { DataTypes, Model } from 'sequelize';
// import IUser from '../../interfaces/IUser';
import dbSequelize from '.';

// const sequelize = new Sequelize(dbSequelize);

class User extends Model {
  public id: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;

  // public static async getUsers(): Promise<IUser[]> {
  //   return User.findAll();
  // }
}

User.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING(128), allowNull: false },
  role: { type: DataTypes.STRING(128), allowNull: false },
  email: { type: DataTypes.STRING(128), allowNull: false },
  password: { type: DataTypes.STRING(256), allowNull: false },
}, {
  sequelize: dbSequelize,
  tableName: 'users',
  timestamps: false,
  underscored: true,
  modelName: 'User',
});

export default User;
