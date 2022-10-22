import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
import { UserInterface } from '../interface/user';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: UserInterface = req.body;
      const token = await this.userService.login(user);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
}
