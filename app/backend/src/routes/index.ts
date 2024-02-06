import { Router } from 'express';
import teamsRouter from './TeamsRoute';
import usersRouter from './UsersRoute';
import matchesRouter from './MatchesRoute';
import leaderBoardRouter from './LeaderBoardRoute';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard/home', leaderBoardRouter);

export default router;
