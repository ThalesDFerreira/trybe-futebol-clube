import UserModel from '../database/models/user.model';
import { ILogin, ILoginService } from '../interfaces/interfaces';

export default class LoginService implements ILoginService {
  validateUser = async (user: ILogin): Promise<ILogin[]> => {
    const userModel = UserModel;
    const userLogin = await userModel.findAll({
      where: {
        email: user.email,
      },
    });
    return userLogin;
  };
}
