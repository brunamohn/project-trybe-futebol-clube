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
}

export default MatchesModel;
