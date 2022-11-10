import ILogin from '../interfaces/ILogin';
import Users from '../models/Users';

export default class LoginGet {
  static async getUser(data: ILogin) {
    const { email } = data;
    const findUser = await Users.findOne({ where: { email } });
    return findUser?.role;
  }
}
