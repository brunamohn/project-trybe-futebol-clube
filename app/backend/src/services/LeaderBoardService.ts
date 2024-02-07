import getLeaderBoardData from '../utils/LeaderBoardUtil';
import MatchesModel from '../models/MatchesModel';
import TeamsModel from '../models/TeamsModel';

class LeaderBoardService {
  constructor(
    private matchesModel = new MatchesModel(),
    private teamsModel = new TeamsModel(),
  ) {}

  async getLeaderBoardHome() {
    const allTeams = await this.teamsModel.findAllTeams();
    const finishedMatches = await this.matchesModel.getMatchesProgress(false);

    const leaderBoard = allTeams.map((team) => {
      const teamMatches = finishedMatches.filter((match) => match.homeTeamId === team.id);
      return getLeaderBoardData(team, teamMatches);
    });

    const sortedLeaderBoard = leaderBoard.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) { return b.totalPoints - a.totalPoints; }
      if (a.totalVictories !== b.totalVictories) { return b.totalVictories - a.totalVictories; }
      if (a.goalsBalance !== b.goalsBalance) { return b.goalsBalance - a.goalsBalance; }
      return b.goalsFavor - a.goalsFavor;
    });
    return { status: 'SUCCESSFUL', data: sortedLeaderBoard };
  }
}

export default LeaderBoardService;
