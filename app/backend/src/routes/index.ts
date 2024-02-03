import { Router } from 'express';
import teamsRouter from './TeamsRoute';
import usersRouter from './UsersRoute';
import matchesRouter from './MatchesRoute';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);
router.use('/matches', matchesRouter);

export default router;
