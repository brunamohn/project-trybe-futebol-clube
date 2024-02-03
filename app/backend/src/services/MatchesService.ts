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
}

export default MatchesService;
