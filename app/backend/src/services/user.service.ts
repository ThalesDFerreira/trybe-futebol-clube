import * as bcryptjs from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { UserInterface } from '../interface/user';
import generateJWT from '../utils/generateJWT';

class UserService {
  private userModel;

  constructor() {
    this.userModel = UserModel;
  }

  public login = async (body: UserInterface): Promise<string | boolean> => {
    const user = await this.userModel.findOne({
      where: { email: body.email },
    });
    if (!user || !bcryptjs.compare(body.password, user.password)) return false;
    const token = generateJWT(user);
    return token;
  };
}

export default UserService;
