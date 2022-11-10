import ITeams from '../interfaces/ITeams';
import Teams from '../models/Teams';

export default class TeamsGetAll {
  static async getAllTeams(): Promise<ITeams[]> {
    const allTeams = await Teams.findAll();
    return allTeams;
  }

  static async getTeamById(id:string) {
    const team = await Teams.findOne({ where: { id } });
    if (team) {
      return team;
    }
    return undefined;
  }
}
