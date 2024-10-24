import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class Room extends Model {
  //   todo
}

Room.init(
  {
    // todo
  },
  { sequelize, timestamps: true }
);

Room.sync({ alter: true });

export default Room;
