export interface ILogin {
  email: string;
  password: string;
  role?: string;
}

export interface ILoginService {
  validateUser(user: ILogin): Promise<ILogin[]>;
}

export interface ITeams {
  id: number;
  teamName: string;
}

export interface ITeamService {
  getAllTeams(): Promise<ITeams[]>;
  getTeamById(id: string): Promise<ITeams | null>;
}
