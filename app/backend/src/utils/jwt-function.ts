import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { ILogin } from '../interfaces/interfaces';

dotenv.config();

const secret: jwt.Secret = process.env.JWT_SECRET || 'jwt_secret';
const genetareToken = (body: ILogin) => jwt.sign(body, secret);

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.body.token = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export { genetareToken, validateToken };
