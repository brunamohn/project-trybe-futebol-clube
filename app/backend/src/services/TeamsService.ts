import TeamModel from '../models/TeamsModel';
import { TeamModelInterface } from '../Interfaces/TeamInterface';

class TeamsService {
  constructor(
    private teamModel:TeamModelInterface = new TeamModel(),
  ) { }

  public async getAllTeams() {
    const allTeams = await this.teamModel.findAllTeams();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getOneTeam(id: number) {
    const selectedTeam = await this.teamModel.findOneTeam(id);
    if (!selectedTeam) {
      return { status: 'NOT FOUND', data: 'Team not found' };
    }
    return { status: 'SUCCESSFUL', data: selectedTeam };
  }
}

export default TeamsService;
