import SequelizeTeams from '../database/models/TeamsModel';
import { TeamInterface, TeamModelInterface } from '../Interfaces/TeamInterface';

class TeamModel implements TeamModelInterface {
  private model = SequelizeTeams;

  async findAllTeams(): Promise<TeamInterface[]> {
    const allTeams = await this.model.findAll();
    return allTeams;
  }

  async findOneTeam(id: number): Promise<TeamInterface | null> {
    const selectedTeam = await this.model.findByPk(id);
    return selectedTeam;
  }
}

export default TeamModel;
