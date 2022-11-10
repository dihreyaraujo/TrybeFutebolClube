import { Request, Response } from 'express';
import LeaderBoard from '../services/LeaderBoard';
import MatchesGetAll from '../services/MatchesGetAll';

export default class LeaderBoardController {
  static async boardHome(req:Request, res:Response) {
    const matchesFinished = await MatchesGetAll.getAllMatchesFinished();
    const board = await LeaderBoard.getTeamHomeBoardFinished(matchesFinished);
    const boardSort = board.sort((a, b) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.goalsBalance === b.goalsBalance) {
          return Number(b.goalsFavor) - Number(a.goalsFavor);
        }
        return Number(b.goalsBalance) - Number(a.goalsBalance);
      }
      return Number(b.totalPoints) - Number(a.totalPoints);
    });
    res.status(200).json(boardSort);
  }

  static async boardAway(req:Request, res:Response) {
    const matches = await MatchesGetAll.getAllMatchesFinished();
    const board = await LeaderBoard.getTeamAwayBoardFinished(matches);
    const boardSort = board.sort((prev, curr) => {
      if (prev.totalPoints === curr.totalPoints) {
        if (prev.goalsBalance === curr.goalsBalance) {
          return Number(curr.goalsFavor) - Number(prev.goalsFavor);
        }
        return Number(curr.goalsBalance) - Number(prev.goalsBalance);
      }
      return Number(curr.totalPoints) - Number(prev.totalPoints);
    });
    res.status(200).json(boardSort);
  }

  static async board(req:Request, res:Response) {
    const matches = await MatchesGetAll.getAllMatchesFinished();
    const boardAway = await LeaderBoard.getTeamAwayBoardFinished(matches);
    const boardHome = await LeaderBoard.getTeamHomeBoardFinished(matches);
    const makeBoard = this.makeBoard(boardAway, boardHome);
    const boardSort = makeBoard.sort((p:any, d:any) => {
      if (p.totalPoints === d.totalPoints) {
        if (p.goalsBalance === d.goalsBalance) {
          return Number(d.goalsFavor) - Number(p.goalsFavor);
        }
        return Number(d.goalsBalance) - Number(p.goalsBalance);
      }
      return Number(d.totalPoints) - Number(p.totalPoints);
    });
    res.status(200).json(boardSort);
  }

  static makeBoard(boardAway:any, boardHome:any) {
    const board = boardAway.map((a:any) => {
      const bh = boardHome.map((h: any) => {
        if (h.name === a.name) {
          const infoBoard = this.infoBoard(h, a);
          return infoBoard;
        }
        return undefined;
      });
      const bhFilter = bh.find((e:any) => e !== undefined);
      return bhFilter;
    });
    return board;
  }

  static infoBoard(h:any, a:any) {
    const infoBoard = {
      name: h.name,
      totalPoints: h.totalPoints + a.totalPoints,
      totalGames: h.totalGames + a.totalGames,
      totalVictories: h.totalVictories + a.totalVictories,
      totalDraws: h.totalDraws + a.totalDraws,
      totalLosses: h.totalLosses + a.totalLosses,
      goalsFavor: h.goalsFavor + a.goalsFavor,
      goalsOwn: h.goalsOwn + a.goalsOwn,
      goalsBalance: h.goalsBalance + a.goalsBalance,
      efficiency: (((
        h.totalPoints + a.totalPoints) / ((h.totalGames + a.totalGames) * 3)) * 100).toFixed(2),
    };
    return infoBoard;
  }
}
