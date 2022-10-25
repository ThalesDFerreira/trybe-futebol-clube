import MatchModel from '../database/models/matches.model';

export interface ILogin {
  email: string;
  password: string;
  role?: string;
}

export interface ILoginService {
  validateUser(user: ILogin): Promise<ILogin[]>;
}

export interface ITeams {
  id?: number;
  teamName?: string;
}

export interface ITeamService {
  getAllTeams(): Promise<ITeams[]>;
  getTeamById(id: string): Promise<ITeams | null>;
}

export interface IMatches {
  id?: string,
  homeTeam?: string,
  homeTeamGoals?: string,
  awayTeam?: string,
  awayTeamGoals?: string,
  inProgress?: string,
}

export interface IMatchesService {
  getAllMatches(): Promise<MatchModel[]>,
  getFind(info: object): Promise<MatchModel[]>,
  insertMatch(info: object): Promise<MatchModel>,
  finishMatch(id: string): Promise<boolean>,
  updateMatch(info: SVGForeignObjectElement, id: string): Promise<boolean>,
}
