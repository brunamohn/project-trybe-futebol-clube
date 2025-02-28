import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardRouter = Router();

const leaderBoardController = new LeaderBoardController();

leaderBoardRouter
  .get('/', (req: Request, res: Response) => leaderBoardController.getLeaderBoardHome(req, res));

export default leaderBoardRouter;
