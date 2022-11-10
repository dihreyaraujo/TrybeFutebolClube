import { Request, Response } from 'express';
import TeamsGetAll from '../services/TeamsGetAll';

export default class TeamsGetAllController {
  static async getAllTeams(req:Request, res:Response) {
    const allTeams = await TeamsGetAll.getAllTeams();
    res.status(200).json(allTeams);
  }

  static async getById(req:Request, res:Response) {
    const { id } = req.params;
    const team = await TeamsGetAll.getTeamById(id);
    res.status(200).json(team);
  }
}
