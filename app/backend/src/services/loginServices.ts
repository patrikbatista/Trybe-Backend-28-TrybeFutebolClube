import bcrypt = require('bcryptjs');
import ILogin from '../interfaces/ILogin';
import User from '../database/models/user';

export default class LoginServices {
  private model;

  constructor(model = User) {
    this.model = model;
  }

  public async loginUser(login: ILogin) : Promise<User | undefined | null> {
    const userExist = await this.model.findOne({ where: { email: login.email } });
    if (userExist) {
      const result = await bcrypt.compare(login.password, userExist.password);
      if (result) {
        return userExist;
      }
      return undefined;
    } return null;
  }
}
