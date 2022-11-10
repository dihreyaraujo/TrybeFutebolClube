import { NextFunction, Request, Response } from 'express';
import TeamsGetAll from '../services/TeamsGetAll';

export default class MiddlewaresMatch {
  static notEqualTeam(req:Request, res:Response, next:NextFunction) {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    } else {
      next();
    }
  }

  static async haveNotTeam(req:Request, res:Response, next:NextFunction) {
    const { homeTeam, awayTeam } = req.body;
    const teamHome = await TeamsGetAll.getTeamById(homeTeam);
    const teamAway = await TeamsGetAll.getTeamById(awayTeam);
    if (teamHome !== undefined && teamAway !== undefined) {
      next();
    } else {
      res.status(404).json({ message: 'There is no team with such id!' });
    }
  }
}
