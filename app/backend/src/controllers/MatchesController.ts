import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    if (req.query.inProgress) {
      const { inProgress } = req.query;
      const inProgressBoolean = inProgress === 'true';
      const { data } = await this.matchesService.getMatchesProgress(inProgressBoolean);

      return res.status(200).json(data);
    }

    const { data } = await this.matchesService.getAllMatches();

    return res.status(200).json(data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const matchIdNumber = Number(id);
    console.log('num', matchIdNumber);
    const { data } = await this.matchesService.finishMatch(matchIdNumber);

    return res.status(200).json(data);
  }

  public async updateMatchScore(req: Request, res: Response) {
    const { id } = req.params;
    const matchIdNumber = Number(id);
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { data } = await this.matchesService
      .updateMatchScore(matchIdNumber, homeTeamGoals, awayTeamGoals);
    return res.status(200).json(data);
  }
}

export default MatchesController;
