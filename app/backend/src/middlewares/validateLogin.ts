import { NextFunction, Request, Response } from 'express';
import Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const validateBody = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const loginBody = req.body;
  try {
    const { error } = loginSchema.valid(loginBody);
    console.log(loginBody, error);
    if (error) {
      next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default validateBody;
