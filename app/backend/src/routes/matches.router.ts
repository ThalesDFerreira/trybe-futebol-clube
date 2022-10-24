import * as express from 'express';
import MatchesController from '../controllers/matches.controller';

const MatchesRouter = express.Router();

const matchesController = new MatchesController();

MatchesRouter.get('/', matchesController.getAllMatches);

export default MatchesRouter;
