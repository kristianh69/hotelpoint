
import Room from "../database/rooms";
import User from "../database/users";

const runMigration = async () => {
  await User.sync({ force: true });
  await Room.sync({ force: true });

};

runMigration();
