import * as bcrypt from 'bcryptjs';
import LoginService from '../services/user.service';
import { ILogin, ILoginService } from '../interfaces/interfaces';
import * as jwtFunction from '../utils/jwt-function';

export default class LoginController {
  constructor(private _loginService: ILoginService = new LoginService()) {}

  public validateUser = async (user: ILogin) => {
    const result = await this._loginService.validateUser(user);
    let decodedPassword = false;
    if (result[0]) {
      decodedPassword = bcrypt.compareSync(user.password, result[0].password);
    }

    if (decodedPassword) {
      const token = jwtFunction.genetareToken(user);
      return { token };
    }

    return { message: 'Incorrect email or password' };
  };

  public findUser = async (user: ILogin): Promise<string | undefined> => {
    const result = await this._loginService.validateUser(user);
    return result[0].role;
  };
}
