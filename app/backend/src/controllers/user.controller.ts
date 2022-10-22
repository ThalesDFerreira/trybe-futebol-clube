import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { log } from 'console';
import UserService from '../services/user.service';
import { UserInterface } from '../interface/user';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      log('Controller');
      const user: UserInterface = req.body;
      const token = await this.userService.login(user);
      return res.status(StatusCodes.OK).json({ token });
    } catch (error) {
      log(`Controller error: ${error}`);
      next(error);
    }
  };
}
