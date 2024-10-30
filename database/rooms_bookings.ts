import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class RoomBooking extends Model {
  declare RoomId: number;
  declare BookingId: number;
}

RoomBooking.init(
  {
    RoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    BookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "RoomBooking",
    timestamps: true,
  }
);

RoomBooking.sync({ alter: true });

export default RoomBooking;
