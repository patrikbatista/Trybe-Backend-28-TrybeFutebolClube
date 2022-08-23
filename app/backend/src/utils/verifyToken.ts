import jwt = require ('jsonwebtoken');

import 'dotenv/config';
import IUserToken from '../interfaces/IUserToken';

const secret = process.env.JWT_SECRET || 'SegredoSegredosoSuperSecreto';

export default function verifyToken(token:string): IUserToken | boolean {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded as IUserToken;
  } catch {
    return false;
  }
}
