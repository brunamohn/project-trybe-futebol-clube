import { Request, Response, Router } from 'express';
import ValidateToken from '../middlewares/validateToken';
import MatchesController from '../controllers/MatchesController';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter.get(
  '/',
  (req: Request, res: Response) => matchesController.getAllMatches(req, res),
);

matchesRouter.patch(
  '/:id/finish',
  ValidateToken.validate,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

matchesRouter.patch(
  '/:id',
  ValidateToken.validate,
  (req: Request, res: Response) => matchesController.updateMatchScore(req, res),
);

matchesRouter.post(
  '/',
  ValidateToken.validate,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default matchesRouter;
