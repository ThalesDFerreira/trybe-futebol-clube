import * as express from 'express';
import TeamController from '../controllers/teams.controller';

const TeamsRouter = express.Router();

const controller = new TeamController();

TeamsRouter.get('/', controller.getAllTeams);
TeamsRouter.get('/:id', controller.getTeamById);

export default TeamsRouter;
