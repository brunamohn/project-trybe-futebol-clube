import getLeaderBoardData from '../utils/LeaderBoardUtil';
import MatchesModel from '../models/MatchesModel';
import TeamsModel from '../models/TeamsModel';

class LeaderBoardService {
  constructor(
    private matchesModel = new MatchesModel(),
    private teamsModel = new TeamsModel(),
  ) {}

  async getLeaderBoard() {
    const allTeams = await this.teamsModel.findAllTeams();
    const finishedMatches = await this.matchesModel.getMatchesProgress(false);

    const leaderBoard = allTeams.map((team) => getLeaderBoardData(team, finishedMatches));

    return { status: 'SUCCESSFUL', data: leaderBoard };
  }
}

export default LeaderBoardService;
