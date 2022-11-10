import TeamsGetAll from './TeamsGetAll';

export default class LeaderBoard {
  static async getTeamHomeBoardFinished(matches:any) {
    const arrayTeams = await TeamsGetAll.getAllTeams();
    const board = arrayTeams.map((e):any => {
      const match = matches.filter((m:any) => m.homeTeam === e.id);
      const name = e.teamName;
      const totalVictories = this.getTotalVictories(match, 'homeTeamGoals', 'awayTeamGoals');
      const totalDraws = this.getTotalDraws(match, 'homeTeamGoals', 'awayTeamGoals');
      const totalLosses = this.getTotalLosses(match, 'homeTeamGoals', 'awayTeamGoals');
      const totalPoints = this.getTotalPoints(totalVictories, totalDraws);
      const totalGames = this.getTotalGames(match);
      const goalsFavor = this.getGoalsFavor(match, 'homeTeamGoals');
      const goalsOwn = this.getGoalsOwn(match, 'awayTeamGoals');
      const goalsBalance = this.getGoalsBalance(goalsFavor, goalsOwn);
      const efficiency = this.getEfficiency(totalGames, totalPoints);
      const board1 = { name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses };
      const board2 = { goalsFavor, goalsOwn, goalsBalance, efficiency };
      return { ...board1, ...board2 };
    });
    return board;
  }

  static async getTeamAwayBoardFinished(matches:any) {
    const arrayTeams = await TeamsGetAll.getAllTeams();
    const board = arrayTeams.map((e):any => {
      const match = matches.filter((m:any) => m.awayTeam === e.id);
      const name = e.teamName;
      const totalVictories = this.getTotalVictories(match, 'awayTeamGoals', 'homeTeamGoals');
      const totalDraws = this.getTotalDraws(match, 'awayTeamGoals', 'homeTeamGoals');
      const totalLosses = this.getTotalLosses(match, 'awayTeamGoals', 'homeTeamGoals');
      const totalPoints = this.getTotalPoints(totalVictories, totalDraws);
      const totalGames = this.getTotalGames(match);
      const goalsFavor = this.getGoalsFavor(match, 'awayTeamGoals');
      const goalsOwn = this.getGoalsOwn(match, 'homeTeamGoals');
      const goalsBalance = this.getGoalsBalance(goalsFavor, goalsOwn);
      const efficiency = this.getEfficiency(totalGames, totalPoints);
      const board1 = { name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses };
      const board2 = { goalsFavor, goalsOwn, goalsBalance, efficiency };
      return { ...board1, ...board2 };
    });
    return board;
  }

  static getTotalPoints(victories:any, draws:any) {
    const totalPoints = Number(victories * 3) + Number(draws);
    return totalPoints;
  }

  static getTotalGames(matchHome:any) {
    const totalGames = matchHome.length;
    return totalGames;
  }

  static getTotalVictories(matchHome:any, principal:string, secundario:string) {
    const totalVictories = matchHome.filter((v:any) => (
      Number(v[principal]) > Number(v[secundario]))).length;
    return totalVictories;
  }

  static getTotalDraws(matchHome:any, principal:string, secundario:string) {
    const totalDraws = matchHome.filter((v:any) => (
      Number(v[principal]) === Number(v[secundario]))).length;
    return totalDraws;
  }

  static getTotalLosses(matchHome:any, principal:string, secundario:string) {
    const totalLosses = matchHome.filter((v:any) => (
      Number(v[principal]) < Number(v[secundario]))).length;
    return totalLosses;
  }

  static getGoalsFavor(matchHome:any, principal:string) {
    const goalsFavor = matchHome.map((g:any) => (
      g[principal])).reduce((prev:any, prox:any) => Number(prev) + Number(prox), 0);
    return goalsFavor;
  }

  static getGoalsOwn(matchHome:any, secundario:string) {
    const goalsOwn = matchHome.map((g:any) => (
      g[secundario])).reduce((prev:any, prox:any) => Number(prev) + Number(prox), 0);
    return goalsOwn;
  }

  static getGoalsBalance(goalsFavor:any, goalsOwn:any) {
    const goalsBalance = Number(goalsFavor) - Number(goalsOwn);
    return goalsBalance;
  }

  static getEfficiency(totalGames:any, totalPoints:any) {
    const efficiency = Number(Number(totalPoints / Number(totalGames * 3)) * 100).toFixed(2);
    return efficiency;
  }
}
