export interface ILogin {
  email: string,
  password: string
  role?: string
}

export interface ILoginService {
  validateUser(user: ILogin): Promise<ILogin[]>
}
