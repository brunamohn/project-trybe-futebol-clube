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
}

export default MatchesService;
