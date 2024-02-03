import { Request, Response, Router } from 'express';
// import ValidateToken from '../middlewares/validateToken';
import MatchesController from '../controllers/MatchesController';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter.get(
  '/',
  (req: Request, res: Response) => matchesController.getAllMatches(req, res),
);

export default matchesRouter;
