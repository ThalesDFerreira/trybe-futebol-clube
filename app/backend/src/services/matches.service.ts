import { IMatches, IMatchesService } from '../interfaces/interfaces';
import MatchesModel from '../database/models/matches.model';

export default class MatchesService implements IMatchesService {
  private _model = MatchesModel;

  public getAllMatches = async (): Promise<IMatches[]> => {
    const matches = await this._model.findAll();
    return matches;
  };
}
