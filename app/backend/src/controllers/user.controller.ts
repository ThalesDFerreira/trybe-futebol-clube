import { Request, Response } from 'express';
import generateToken from '../utils/generateJWT';
import ILoginService from '../interface/classes/ILoginService';
import LoginService from '../services/user.service';
import ILoginBody from '../interface/requests/ILoginBody';

export default class LoginController {
  constructor(private _service: ILoginService = new LoginService()) {}

  public findUser = async (
    req: Request<unknown, unknown, ILoginBody>,
    res: Response,
  ) => {
    const searchResult = await this._service.findUser(req.body);

    if (searchResult) {
      const token = generateToken(req.body);
      return res.status(200).json({ token });
    }

    res.status(401).json({ message: 'Incorrect email or password' });
  };

  public findUserRole = async (req: Request, res: Response) => {
    const role = await this._service.findUserRole(req.body.decoded);
    res.status(200).json({ role });
  };
}
