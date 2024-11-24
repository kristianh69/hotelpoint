import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class Room extends Model {
  declare id: number;
  declare name: string;
  declare numberOfBeds: number;
  declare description?: string;
  declare tags?: string;
  declare price: number;
  declare imageUrl?: string; // New attribute for the image URL
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
    numberOfBeds: {
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
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true, // Set to true if the image URL is optional
    },
  },
  {
    sequelize,
    tableName: "rooms",
    timestamps: true,
  }
);

export default Room;
