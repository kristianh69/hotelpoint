import { Booking } from "../database";
import { Room } from "../database";
import { User } from "../database";

const runMigration = async () => {
  await User.sync({ force: true });
  await Room.sync({ force: true });
  await Booking.sync({ force: true });
};

runMigration();
