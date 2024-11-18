import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class Booking extends Model {
  declare id: number;
  declare BookedBy: number;
  declare CreatedAt: Date;
  declare StartingDate: Date;
  declare EndingDate: Date;
  declare NumberOfQuest: number;
  declare GuestList: string;
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    BookedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    StartingDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    EndingDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    NumberOfQuest: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    GuestList: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, timestamps: true }
);

Booking.sync({ alter: true });

export default Booking;
