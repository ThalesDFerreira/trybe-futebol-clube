import UserModel from '../database/models/user.model';
import IUser, { UserInterface } from '../interface/user';

class UserService {
  private userModel;

  constructor() {
    this.userModel = UserModel;
  }

  public login = async (body: UserInterface): Promise<IUser> => {
    const user = await this.userModel.findOne({
      where: { email: body.email },
    });
    return user as IUser;
  };
}

export default UserService;
