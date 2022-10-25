import * as express from 'express';
import MatchesController from '../controllers/matches.controller';
import middlewareMatches from '../middlewares/middlewareMatches';
import { validateToken } from '../utils/jwt-function';

const MatchesRouter = express.Router();

const matchesController = new MatchesController();

MatchesRouter.get('/', matchesController.getAllMatches);
MatchesRouter.post('/', validateToken, middlewareMatches, matchesController.insertMatch);
MatchesRouter.patch('/:id/finish', matchesController.finishMatch);
MatchesRouter.patch('/:id', matchesController.updateMatch);

export default MatchesRouter;
