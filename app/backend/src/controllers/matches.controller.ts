import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';
import { IMatchesService } from '../interfaces/interfaces';

export default class MatchesController {
  constructor(
    private _matchesService: IMatchesService = new MatchesService(),
  ) {}

  public getAllMatches = async (req: Request, res: Response) => {
    let matches;

    if (!req.query) {
      matches = await this._matchesService.getAllMatches();
    } else {
      const { inProgress } = req.query;
      const query = { ...req.query };
      if (inProgress) query.inProgress = JSON.parse(inProgress as string);
      matches = await this._matchesService.getFind(query);
    }

    res.status(200).json(matches);
  };

  insertMatch = async (req: Request, res: Response) => {
    const result = await this._matchesService.insertMatch(req.body);
    res.status(201).json(result);
  };

  finishMatch = async (req: Request, res: Response) => {
    const update = await this._matchesService.finishMatch(req.params.id);
    if (update) res.status(200).json({ message: 'Finished' });
  };

  updateMatch = async (req: Request, res: Response) => {
    const update = await this._matchesService.updateMatch(req.body, req.params.id);
    if (update) res.status(200).json({ ...req.body });
  };
}
