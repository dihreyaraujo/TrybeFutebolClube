import { Request, Response } from 'express';
import UpdateStatusMatch from '../services/UpdateStatusMatch';

export default class UpdateStatusController {
  static async updateInProgress(req: Request, res: Response) {
    const { id } = req.params;
    await UpdateStatusMatch.updateInProgress(id);
    res.status(200).json({ message: 'Finished' });
  }

  static async updateMatch(req:Request, res:Response) {
    const { id } = req.params;
    await UpdateStatusMatch.updateMatch(id, req.body);
    res.status(200).json({ message: 'Updated Goals' });
  }
}
