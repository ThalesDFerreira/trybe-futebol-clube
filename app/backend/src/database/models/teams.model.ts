import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class TeamsModel extends Model {
  id!: number;
  teamName!: string;
}

TeamsModel.init(
  {
    id: {
      type: INTEGER,
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

export default TeamsModel;
