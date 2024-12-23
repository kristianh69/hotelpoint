import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class User extends Model {
  declare id: string;
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
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
  { sequelize, timestamps: true, tableName: "users" }
);

export default User;
