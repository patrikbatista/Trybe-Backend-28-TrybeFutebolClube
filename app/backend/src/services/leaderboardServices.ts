import Team from '../database/models/team';
import Match from '../database/models/match';
import IMatch from '../interfaces/IMatch';
import ITeam from '../interfaces/ITeam';
import ILeaderboard from '../interfaces/ILeaderboard';

export default class Leaderboard {
  private teamModel;
  private matchModel;

  constructor(teamModel = Team, matchModel = Match) {
    this.teamModel = teamModel;
    this.matchModel = matchModel;
  }

  private static matchesForEach(matches: IMatch[], team: ITeam, leaderboard: ILeaderboard) {
    const leaderboardCopy = { ...leaderboard };
    matches.forEach((match) => {
      if (match.homeTeam === team.id && match.inProgress === false) {
        if (match.homeTeamGoals > match.awayTeamGoals) {
          leaderboardCopy.totalPoints += 3;
          leaderboardCopy.totalVictories += 1;
        } else if (match.homeTeamGoals === match.awayTeamGoals) {
          leaderboardCopy.totalPoints += 1;
          leaderboardCopy.totalDraws += 1;
        } else leaderboardCopy.totalLosses += 1;

        leaderboardCopy.goalsFavor += match.homeTeamGoals;
        leaderboardCopy.goalsOwn += match.awayTeamGoals;
        leaderboardCopy.totalGames += 1;
      }
    });
    leaderboardCopy.goalsBalance = leaderboardCopy.goalsFavor - leaderboardCopy.goalsOwn;
    return leaderboardCopy;
  }

  private static matchesMap(team: ITeam, matches: IMatch[]) {
    const initialLeaderboard: ILeaderboard = {
      name: team.teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: '0',
    };

    const leaderboard = Leaderboard.matchesForEach(matches, team, initialLeaderboard);
    leaderboard.efficiency = (
      (leaderboard.totalPoints / (leaderboard.totalGames * 3)) * 100).toFixed(2);

    return leaderboard;
  }

  private static leaderboardSort(a: ILeaderboard, b: ILeaderboard) {
    if (a.totalPoints > b.totalPoints) {
      return -1;
    } if (a.totalPoints < b.totalPoints) return 1;

    if (a.goalsBalance > b.goalsBalance) {
      return -1;
    } if (a.goalsBalance < b.goalsBalance) return 1;

    if (a.goalsFavor > b.goalsFavor) {
      return -1;
    } if (a.goalsFavor < b.goalsFavor) return 1;

    if (a.goalsOwn > b.goalsOwn) {
      return -1;
    } if (a.goalsOwn < b.goalsOwn) return 1;

    return 0;
  }

  public async getLeaderboardHome() {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll();

    const leaderboard = teams.map((team) => Leaderboard.matchesMap(team, matches));

    const leaderboardSorted = leaderboard.sort((a, b) => Leaderboard.leaderboardSort(a, b));
    return leaderboardSorted;
  }
}
