export interface TeamInterface {
  id: number;
  teamName: string;
}

export interface TeamModelInterface {
  findAllTeams(): Promise<TeamInterface[]>;
  findOneTeam(id: number): Promise<TeamInterface | null>;
}
