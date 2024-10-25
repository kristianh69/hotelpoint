import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class RoomBooking extends Model {
  declare RoomId: number;
  declare BookingId: number;

}

RoomBooking.init(
  {
    RoomId:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey:true,
    },
    
    BookingId:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
    
  },
  { sequelize, timestamps: true }
);

RoomBooking.sync({ alter: true });

export default RoomBooking;
