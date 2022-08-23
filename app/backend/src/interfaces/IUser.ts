import IUserToken from './IUserToken';

export default interface IUser extends IUserToken{
  password: string;
}
