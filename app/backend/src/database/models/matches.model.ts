import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';
import Teams from './teams.model';

class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: number;
}

Matches.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeam: {
      type: STRING,
      allowNull: false,
    },
    homeTeamGoals: {
      type: STRING,
      allowNull: false,
    },
    awayTeam: {
      type: STRING,
      allowNull: false,
    },
    awayTeamGoals: {
      type: STRING,
      allowNull: false,
    },
    inProgress: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },
);

Matches.belongsTo(Teams, { foreignKey: 'home_team', as: 'id' });
Matches.belongsTo(Teams, { foreignKey: 'away_team', as: 'id' });

export default Matches;
