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
  finishMatch(matchId: number): Promise<{ message: string }>;
  updateMatchScore(
    matchId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<MatchesInterface>;
  createMatch(match: MatchesInterface): Promise<MatchesInterface | null>;
}
