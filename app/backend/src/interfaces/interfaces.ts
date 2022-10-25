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
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress?: boolean;
  teamHome?: {
    teamName: string;
  };
  teamAway?: {
    teamName: string;
  };
}

export interface IMatchesService {
  getAllMatches(): Promise<MatchModel[]>;
  getFind(info: object): Promise<MatchModel[]>;
  insertMatch(info: object): Promise<MatchModel>;
  finishMatch(id: string): Promise<boolean>;
  updateMatch(info: SVGForeignObjectElement, id: string): Promise<boolean>;
}

export interface ILeaderboardTeam {
  id: number;
  teamName: string;
  homeTeam?: IMatches[];
  awayTeam?: IMatches[];
}

export interface ILBformat {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}
