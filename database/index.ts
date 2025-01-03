import Room from "./rooms";
import User from "./users";
import Booking from "./bookings";

Booking.belongsTo(User, {
  onDelete: "CASCADE",
  as: "User",
  foreignKey: "BookedBy",
});
User.hasMany(Booking, {
  onDelete: "CASCADE",
  as: "Bookings",
  foreignKey: "BookedBy",
});

Booking.belongsTo(Room, {
  onDelete: "CASCADE",
  as: "Room",
  foreignKey: "RoomId",
});
Room.hasMany(Booking, {
  onDelete: "CASCADE",
  as: "Bookings",
  foreignKey: "RoomId",
});

export { Room, User, Booking };
