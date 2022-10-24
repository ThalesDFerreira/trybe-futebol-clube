import * as bcrypt from 'bcryptjs';
import ILoginService from '../interface/classes/ILoginService';
import UserModel from '../database/models/user.model';
import ILoginBody from '../interface/requests/ILoginBody';

export default class LoginService implements ILoginService {
  private _model = UserModel;

  public findUser = async (info: ILoginBody): Promise<boolean> => {
    const search = await this._model.findOne({
      where: { email: info.email },
    });

    if (!search) {
      return false;
    }

    const isEqual = bcrypt.compareSync(info.password, search.password);
    return isEqual;
  };

  public findUserRole = async (decoded: ILoginBody): Promise<string> => {
    const userInfo = await this._model.findOne({
      where: { email: decoded.email },
    });

    if (!userInfo) return 'user';

    return userInfo.role;
  };
}
