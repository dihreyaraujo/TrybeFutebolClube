import { Request, Response } from 'express';
import MatchPost from '../services/MatchPost';
import GenerateToken from '../utils/GenerateToken';

export default class MatchPostController {
  static async matchPost(req: Request, res: Response) {
    const token: any = req.header('Authorization');
    const validateToken = GenerateToken.decodeToken(token);
    if (!validateToken.email) {
      res.status(401).json({ message: 'Token must be a valid token' });
    } else {
      const insertMatch = await MatchPost.insertMatchInProgress(req.body);
      res.status(201).json(insertMatch);
    }
  }
}
