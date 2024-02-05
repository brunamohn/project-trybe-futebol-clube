import MatchesModel from '../models/MatchesModel';
import { MatchesModelInterface } from '../Interfaces/MatchesInterface';

class MatchesService {
  constructor(
    private matchesModel:MatchesModelInterface = new MatchesModel(),
  ) { }

  public async getAllMatches() {
    const allMatches = await this.matchesModel.getAllMatches();

    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getMatchesProgress(inProgress: boolean) {
    const mantchesProgress = await this.matchesModel.getMatchesProgress(inProgress);

    return { status: 'SUCCESSFUL', data: mantchesProgress };
  }

  public async finishMatch(matchId: number) {
    const finishedMatch = await this.matchesModel.finishMatch(matchId);

    return { status: 'SUCCESSFUL', data: finishedMatch };
  }

  public async updateMatchScore(matchId: number, homeTeamGoals: number, awayTeamGoals: number) {
    const updatedMatch = await this.matchesModel
      .updateMatchScore(matchId, homeTeamGoals, awayTeamGoals);

    return { status: 'SUCCESSFUL', data: updatedMatch };
  }
}

export default MatchesService;
