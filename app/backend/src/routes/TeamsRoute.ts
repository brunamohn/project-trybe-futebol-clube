import { Request, Response, Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsRouter = Router();

const teamsController = new TeamsController();

teamsRouter.get('/', (req: Request, res: Response) => teamsController.getAllTeams(req, res));
teamsRouter.get('/:id', (req: Request, res: Response) => teamsController.getOneTeam(req, res));

export default teamsRouter;
