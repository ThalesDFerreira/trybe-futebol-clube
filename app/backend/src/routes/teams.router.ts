import * as express from 'express';
import TeamController from '../controllers/teams.controller';

const TeamsRouter = express.Router();

const teamsController = new TeamController();

TeamsRouter.get('/', teamsController.getAllTeams);
TeamsRouter.get('/:id', teamsController.getTeamById);

export default TeamsRouter;
