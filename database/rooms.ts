import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class Room extends Model {
  declare id: number;
  declare name: string;
  declare NumberOfbeds: number;
  declare description: string;
  declare tags: string;
  declare price: number;
}

Room.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    NumberOfbeds: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    tags: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(16, 2),
      allowNull: false,
    },
  },
  { sequelize, timestamps: true }
);

Room.sync({ alter: true });

export default Room;
