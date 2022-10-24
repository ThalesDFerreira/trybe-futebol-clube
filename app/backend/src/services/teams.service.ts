import { ITeams, ITeamService } from '../interfaces/interfaces';
import TeamModel from '../database/models/teams.model';

export default class TeamsService implements ITeamService {
  private _model = TeamModel;

  public getAllTeams = async (): Promise<ITeams[]> => {
    const teams = await this._model.findAll();
    return teams;
  };

  public getTeamById = async (id: string): Promise<ITeams | null> => {
    const team = await this._model.findOne({
      where: { id },
    });
    return team;
  };
}
