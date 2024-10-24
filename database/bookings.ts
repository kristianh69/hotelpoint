import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class Booking extends Model {
  //   todo
}

Booking.init(
  {
    // todo
  },
  { sequelize, timestamps: true }
);

Booking.sync({ alter: true });

export default Booking;
