import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  id?: number;
  teamName: string;
}

Teams.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Teams;
