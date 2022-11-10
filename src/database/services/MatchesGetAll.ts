import Matches from '../models/Matches';
import Teams from '../models/Teams';

export default class MatchesGetAll {
  static async getAllMatches() {
    const matches = await Matches.findAll({
      include:
      [{ model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } }] });
    return matches;
  }

  static async getAllMatchesInProgress() {
    const matchesInProgress = await Matches.findAll({
      where: { inProgress: 1 || true },
      include:
      [{ model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } }] });
    return matchesInProgress;
  }

  static async getAllMatchesFinished() {
    const matchesInProgress = await Matches.findAll({
      where: { inProgress: 0 || false },
      include:
      [{ model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } }] });
    return matchesInProgress;
  }
}
