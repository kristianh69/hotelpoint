import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class RoomBooking extends Model {
  //   todo
}

RoomBooking.init(
  {
    // todo
  },
  { sequelize, timestamps: true }
);

RoomBooking.sync({ alter: true });

export default RoomBooking;
