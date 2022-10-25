import { IMatchesService } from '../interfaces/interfaces';
import MatchesModel from '../database/models/matches.model';
import TeamsModels from '../database/models/teams.model';

export default class MatchesService implements IMatchesService {
  private _model = MatchesModel;

  public getAllMatches = async (): Promise<MatchesModel[]> => {
    const matches = await this._model.findAll({
      include: [
        { model: TeamsModels, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsModels, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  };

  public getFind = async (info: object): Promise<MatchesModel[]> => {
    const matches = await this._model.findAll({
      where: info,
      include: [
        { model: TeamsModels, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsModels, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  };

  public insertMatch = async (info: object): Promise<MatchesModel> => {
    const insert = await this._model.create({ ...info, inProgress: true });
    return insert;
  };

  public finishMatch = async (id: string): Promise<boolean> => {
    await this._model.update(
      { inProgress: false },
      { where: { id } },
    );
    return true;
  };

  public updateMatch = async (info: object, id: string): Promise<boolean> => {
    await this._model.update(
      { ...info },
      { where: { id } },
    );
    return true;
  };
}
