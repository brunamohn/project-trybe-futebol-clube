import { LeaderBoardInterface } from '../Interfaces/LeaderBoardInterface';
import { MatchesInterface } from '../Interfaces/MatchesInterface';
import { TeamInterface } from '../Interfaces/TeamInterface';

function getTotalGames(team: TeamInterface, matches: MatchesInterface[]) {
  const allMatches = matches
    .filter((match) => (match.homeTeamId === team.id || match.awayTeamId === team.id)).length;

  return allMatches;
}

function getTotalVictories(team: TeamInterface, matches: MatchesInterface[]) {
  const victories = matches
    .filter((match) => (match.homeTeamId === team.id && match.homeTeamGoals > match.awayTeamGoals)
      || (match.awayTeamId === team.id && match.awayTeamGoals > match.homeTeamGoals)).length;

  return victories;
}

function getTotalDraws(team: TeamInterface, matches: MatchesInterface[]) {
  const draws = matches
    .filter((match) => (match.homeTeamId === team.id || match.awayTeamId === team.id)
      && match.homeTeamGoals === match.awayTeamGoals).length;

  return draws;
}

function getTotalLosses(team: TeamInterface, matches: MatchesInterface[]) {
  const losses = matches
    .filter((match) => (match.homeTeamId === team.id && match.homeTeamGoals < match.awayTeamGoals)
      || (match.awayTeamId === team.id && match.awayTeamGoals < match.homeTeamGoals)).length;

  return losses;
}

function getGoalsFavor(team: TeamInterface, matches: MatchesInterface[]) {
  const goalsFavor = matches
    .filter((match) => match.homeTeamId === team.id)
    .reduce((acc, match) => acc + match.homeTeamGoals, 0)
    + matches
      .filter((match) => match.awayTeamId === team.id)
      .reduce((acc, match) => acc + match.awayTeamGoals, 0);

  return goalsFavor;
}

function getGoalsOwn(team: TeamInterface, matches: MatchesInterface[]) {
  const goalsOwn = matches
    .filter((match) => match.homeTeamId === team.id)
    .reduce((acc, match) => acc + match.awayTeamGoals, 0)
    + matches
      .filter((match) => match.awayTeamId === team.id)
      .reduce((acc, match) => acc + match.homeTeamGoals, 0);

  return goalsOwn;
}

function getGoalsBalance(team: TeamInterface, matches: MatchesInterface[]) {
  const goalsFavor = getGoalsFavor(team, matches);
  const goalsOwn = getGoalsOwn(team, matches);

  return goalsFavor - goalsOwn;
}

function getTotalPoints(team: TeamInterface, matches: MatchesInterface[]) {
  const victories = getTotalVictories(team, matches);
  const draws = getTotalDraws(team, matches);

  return victories * 3 + draws;
}

function getEfficiency(team: TeamInterface, matches: MatchesInterface[]) {
  const totalPoints = getTotalPoints(team, matches);
  const totalGames = getTotalGames(team, matches);

  return ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
}

function getLeaderBoardData(team: TeamInterface, matches: MatchesInterface[])
  : LeaderBoardInterface {
  return {
    name: team.teamName,
    totalPoints: getTotalPoints(team, matches),
    totalGames: getTotalGames(team, matches),
    totalVictories: getTotalVictories(team, matches),
    totalDraws: getTotalDraws(team, matches),
    totalLosses: getTotalLosses(team, matches),
    goalsFavor: getGoalsFavor(team, matches),
    goalsOwn: getGoalsOwn(team, matches),
    goalsBalance: getGoalsBalance(team, matches),
    efficiency: getEfficiency(team, matches),
  };
}

export default getLeaderBoardData;
