export interface MatchesInterface {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface MatchesModelInterface {
  getAllMatches(): Promise<MatchesInterface[]>;
  getMatchesProgress(inProgress: boolean): Promise<MatchesInterface[]>;
}
