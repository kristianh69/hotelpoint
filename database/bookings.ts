import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";

class Booking extends Model {
  declare id: number;
  declare BookedBy: string;
  declare CreatedAt: Date;
  declare StartingDate: Date;
  declare EndingDate: Date;
  declare RoomId: number;
  declare Confirmed: boolean;
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    BookedBy: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: "users", key: "id" },
    },

    StartingDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    EndingDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    RoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "rooms", key: "id" },
    },
    Confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize, timestamps: true, tableName: "bookings" }
);

export default Booking;
