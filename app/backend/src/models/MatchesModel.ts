import SequelizeTeams from '../database/models/TeamsModel';
import SequelizeMatches from '../database/models/MatchesModel';
import { MatchesInterface, MatchesModelInterface } from '../Interfaces/MatchesInterface';

class MatchesModel implements MatchesModelInterface {
  private model = SequelizeMatches;

  async getAllMatches(): Promise<MatchesInterface[]> {
    const allMatches = await this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return allMatches;
  }
}

export default MatchesModel;
