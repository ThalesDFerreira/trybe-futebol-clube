export interface UserInterface {
  email: string;
  password: string;
}

export default interface IUser extends UserInterface {
  id: number;
  username: string;
  role: string;
}
