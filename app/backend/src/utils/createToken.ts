import jwt = require ('jsonwebtoken');

import 'dotenv/config';
import IUserToken from '../interfaces/IUserToken';

const secret = process.env.JWT_SECRET || 'SegredoSegredosoSuperSecreto';

export default function createToken(user: IUserToken): string {
  const jwtConfig = {
    expiresIn: '7d',
  };
  const token = jwt.sign(user, secret, jwtConfig);
  return token;
}
