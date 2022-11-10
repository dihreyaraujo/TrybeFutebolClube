import { IMatchGoals } from '../interfaces/IMatch';
import Matches from '../models/Matches';

export default class UpdateStatusMatch {
  static async updateInProgress(id: string): Promise<void> {
    await Matches.update({ inProgress: 0 }, { where: { id } });
  }

  static async updateMatch(id: string, data: IMatchGoals): Promise<void> {
    const { homeTeamGoals, awayTeamGoals } = data;
    await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}
