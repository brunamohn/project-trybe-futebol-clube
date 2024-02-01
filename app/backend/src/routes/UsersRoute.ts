import { Request, Response, Router } from 'express';
import ValidateToken from '../middlewares/validateToken';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post(
  '/',
  (req: Request, res: Response) => usersController.verifyLogin(req, res),
);

usersRouter.get(
  '/role',
  ValidateToken.validate,
  (req: Request, res: Response) => res.status(200).json({ role: res.locals.role.role }),
);

export default usersRouter;
