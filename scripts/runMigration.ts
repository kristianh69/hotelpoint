import RoomBooking from "@/database/rooms_bookings";
import Room from "../database/rooms";
import User from "../database/users";

const runMigration = async () => {
  await User.sync({ force: true });
  await Room.sync({ force: true });
  await RoomBooking.sync({ alter: true });
};

runMigration();
