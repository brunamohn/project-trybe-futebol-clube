import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
  ) { }

  public async getLeaderBoard(_req: Request, res: Response) {
    const leaderBoard = await this.leaderBoardService.getLeaderBoard();
    return res.status(200).json(leaderBoard.data);
  }
}

export default LeaderBoardController;
