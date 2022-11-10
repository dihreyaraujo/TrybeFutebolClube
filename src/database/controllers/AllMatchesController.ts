import { Request, Response } from 'express';
import MatchesGetAll from '../services/MatchesGetAll';

export default class AllMatchesController {
  static async getAllMatches(req:Request, res:Response) {
    if (req.query.inProgress !== undefined) {
      const { inProgress } = req.query;
      if (inProgress === 'true') {
        const matchesInProgress = await MatchesGetAll.getAllMatchesInProgress();
        res.status(200).json(matchesInProgress);
      } else {
        const matchesFinished = await MatchesGetAll.getAllMatchesFinished();
        res.status(200).json(matchesFinished);
      }
    } else {
      const matches = await MatchesGetAll.getAllMatches();
      res.status(200).json(matches);
    }
  }
}
