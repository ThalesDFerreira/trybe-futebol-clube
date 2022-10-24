import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';
import { IMatchesService } from '../interfaces/interfaces';

export default class MatchesController {
  constructor(private _matchesService: IMatchesService = new MatchesService()) {}

  public getAllMatches = async (req: Request, res: Response) => {
    const matches = await this._matchesService.getAllMatches();
    res.status(200).json(matches);
  };
}
