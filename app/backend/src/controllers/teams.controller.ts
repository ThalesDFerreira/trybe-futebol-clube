import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';
import { ITeamService } from '../interfaces/interfaces';

export default class TeamController {
  constructor(private _teamsService: ITeamService = new TeamsService()) {}

  public getAllTeams = async (req: Request, res: Response) => {
    const teams = await this._teamsService.getAllTeams();
    res.status(200).json(teams);
  };

  public getTeamById = async (req: Request, res: Response) => {
    const team = await this._teamsService.getTeamById(req.params.id);
    res.status(200).json(team);
  };
}
