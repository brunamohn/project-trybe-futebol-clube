import SequelizeTeams from '../database/models/TeamsModel';
import SequelizeMatches from '../database/models/MatchesModel';
import { MatchesInterface, MatchesModelInterface } from '../Interfaces/MatchesInterface';

class MatchesModel implements MatchesModelInterface {
  private model = SequelizeMatches;

  public async getAllMatches(): Promise<MatchesInterface[]> {
    const allMatches = await this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return allMatches;
  }

  public async getMatchesProgress(inProgress: boolean): Promise<MatchesInterface[]> {
    const inProgressMatches = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return inProgressMatches;
  }

  public async finishMatch(matchId: number): Promise<{ message: string }> {
    const match = await this.model.findByPk(matchId);
    if (!match) {
      throw new Error('Match not found');
    }

    await match.update({ inProgress: false });

    return { message: 'Finished' };
  }

  public async updateMatchScore(
    matchId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<MatchesInterface> {
    const match = await this.model.findByPk(matchId);
    if (!match) {
      throw new Error('Match not found');
    }

    const updatedMatch = await match.update({ homeTeamGoals, awayTeamGoals });

    return updatedMatch;
  }

  public async createMatch(match: MatchesInterface): Promise<MatchesInterface | null> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = match;

    const verifyHomeTeam = await SequelizeTeams.findByPk(homeTeamId);
    const verifyAwayTeam = await SequelizeTeams.findByPk(awayTeamId);

    if (!verifyHomeTeam || !verifyAwayTeam) {
      return null;
    }

    const newMatch = await this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    return newMatch;
  }
}

export default MatchesModel;
