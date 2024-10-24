import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class User extends Model {
  declare id: number;
  declare email: string;
  declare role: string;
  declare name: string;
  declare surname: string;
  declare passwordHash: string;
  declare createdAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, timestamps: true }
);

User.sync({ alter: true });

export default User;
