import { Request, Response } from 'express';
import LoginPost from '../services/LoginPostService';

export default class LoginController {
  static async loginVerify(req: Request, res: Response) {
    const verifyLogin = await LoginPost.loginVerify(req.body);
    if (verifyLogin) {
      res.status(200).json({ token: verifyLogin });
    } else {
      res.status(401).json({ message: 'Incorrect email or password' });
    }
  }
}
