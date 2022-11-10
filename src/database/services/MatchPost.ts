import IMatch from '../interfaces/IMatch';
import Matches from '../models/Matches';

export default class MatchPost {
  static async insertMatchInProgress(data: IMatch) {
    const insertMatch = await Matches.create({ ...data, inProgress: 1 });
    return insertMatch;
  }
}
