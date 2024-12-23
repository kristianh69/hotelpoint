import Booking from "../database/bookings";
import Room from "../database/rooms";
import User from "../database/users";

const runMigration = async () => {
  await User.sync({ force: true });
  await Room.sync({ force: true });
  await Booking.sync({ force: true });
};

runMigration();
