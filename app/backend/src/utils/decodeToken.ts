import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import ILoginBody from '../interface/requests/ILoginBody';

dotenv.config();

const secret: jwt.Secret = process.env.JWT_SECRET
  ? process.env.JWT_SECRET
  : '1234567';

export default (token: string): ILoginBody | null => {
  try {
    return jwt.verify(token, secret) as ILoginBody;
  } catch (error) {
    return null;
  }
};
