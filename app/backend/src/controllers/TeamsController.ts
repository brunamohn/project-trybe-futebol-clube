import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const allTeams = await this.teamsService.getAllTeams();
    return res.status(200).json(allTeams.data);
  }

  public async getOneTeam(req: Request, res: Response) {
    const { id } = req.params;
    const selectedTeam = await this.teamsService.getOneTeam(Number(id));

    if (selectedTeam.status === 'NOT FOUND') {
      return res.status(mapStatusHTTP(selectedTeam.status)).json(selectedTeam.data);
    }

    return res.status(200).json(selectedTeam.data);
  }
}

export default TeamsController;
