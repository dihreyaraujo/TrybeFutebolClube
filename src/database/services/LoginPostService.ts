import bcrypt = require('bcryptjs');
import Users from '../models/Users';
import ILogin from '../interfaces/ILogin';
import GenerateToken from '../utils/GenerateToken';

export default class LoginPost {
  static async loginVerify(loginData: ILogin) {
    const { email, password } = loginData;
    const dataDb = await Users.findOne({ where: { email } });
    if (dataDb) {
      const hash = await bcrypt.compare(password, dataDb.password);
      if (hash) {
        const generateToken = new GenerateToken(loginData);
        const token = generateToken.sendToken();
        return token;
      }
      return undefined;
    }
  }
}
