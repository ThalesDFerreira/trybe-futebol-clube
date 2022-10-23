import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';
// import Matches from './matches.model';

class Teams extends Model {
  id!: number;
  teamName!: string;
}

Teams.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
  },
);

// Teams.hasMany(Matches, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });

export default Teams;
