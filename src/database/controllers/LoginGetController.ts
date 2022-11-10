import { Request, Response } from 'express';
import LoginGet from '../services/LoginGetService';
import GenerateToken from '../utils/GenerateToken';

export default class LoginGetController {
  static async getUserRole(req: Request, res: Response) {
    const token: any = req.header('Authorization');
    const dataToken = GenerateToken.decodeToken(token);
    if (dataToken.email) {
      const role = await LoginGet.getUser(dataToken);
      res.status(200).json({ role });
    } else {
      res.status(401).json({ message: dataToken });
    }
  }
}
