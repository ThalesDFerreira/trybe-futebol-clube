import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';
import { IMatchesService } from '../interfaces/interfaces';

export default class MatchesController {
  constructor(
    private _matchesService: IMatchesService = new MatchesService(),
  ) {}

  public getAllMatches = async (req: Request, res: Response) => {
    let matches;

    if (Object.keys(req.query).length > 0) {
      if (req.query.inProgress === 'true') {
        matches = await this._matchesService.getMatchesInProgress();
        // return res.status(200).json(getMatchesInProgress);
      } else {
        matches = await this._matchesService.getMatchesFinished();
        // return res.status(200).json(getMatchesFinished);
      }
    } else {
      matches = await this._matchesService.getAllMatches();
    }
    res.status(200).json(matches);
  };
}
