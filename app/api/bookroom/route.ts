import { auth } from "@/auth";
import { Room } from "@/database";
import { Booking } from "@/database";
import { bookingSchema } from "../../../schemas/auth";
import { NextResponse } from "next/server";
import { Op } from "sequelize"; // Import Op z Sequelize

export const POST = auth(async (req) => {
  if (!req.auth) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  let body;
  try {
    body = await bookingSchema.validate(await req.json(), {
      strict: true,
      abortEarly: false,
    });
  } catch (e: any) {
    return NextResponse.json(
      { message: "Invalid request body", errors: e.errors },
      { status: 400 }
    );
  }

  try {
    const room = await Room.findByPk(body.RoomId);
    if (!room) {
      return NextResponse.json(
        { message: "Room does not exist." },
        { status: 404 }
      );
    }

    const overlappingBookings = await Booking.findAll({
      where: {
        [Op.and]: [
          { RoomId: body.RoomId },
          {
            [Op.or]: [
              {
                StartingDate: {
                  [Op.between]: [body.StartingDate, body.EndingDate],
                },
              },
              {
                EndingDate: {
                  [Op.between]: [body.StartingDate, body.EndingDate],
                },
              },
            ],
          },
        ],
      },
    });

    if (overlappingBookings.length > 0) {
      return NextResponse.json(
        { message: "The room is already booked for the given dates." },
        { status: 400 }
      );
    }

    const newBooking = await Booking.create({
      BookedBy: req.auth.user.id,
      RoomId: body.RoomId,
      StartingDate: body.StartingDate,
      EndingDate: body.EndingDate,
    });
    console.log("AA BB", newBooking);

    return NextResponse.json(
      { message: "Booking successfully created.", booking: newBooking },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
});
