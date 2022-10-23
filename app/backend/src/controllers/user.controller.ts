import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
import { UserInterface } from '../interface/user';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const userInterface: UserInterface = req.body;
      const token = await this.userService.login(userInterface);
      if (!token) {
        return res
          .status(401)
          .json({ message: 'Incorrect email or password' });
      }
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
}
