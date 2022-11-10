import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import ILogin from '../interfaces/ILogin';

export default class GenerateToken {
  private login: ILogin;
  private token: string;

  constructor(user: ILogin) {
    this.login = user;
  }

  public sendToken(): string {
    const secret = process.env.JWT_SECRET || 'minhasenhasecreta';
    const newToken = jwt.sign({ data: this.login }, secret);
    return newToken;
  }

  static decodeToken(token: string): any {
    const secret = process.env.JWT_SECRET || 'minhasenhasecreta';
    try {
      const tokenDecoded: any = jwt.verify(token, secret);
      return tokenDecoded.data;
    } catch (err: any) {
      return err.message;
    }
  }
}

//start project
