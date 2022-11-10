import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  id?: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

Users.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
  },
  role: {
    type: STRING,
  },
  email: {
    type: STRING,
  },
  password: {
    type: STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default Users;
