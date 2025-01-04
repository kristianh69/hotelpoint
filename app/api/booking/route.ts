import { auth } from "@/auth";
import { Room } from "@/database";
import { Booking } from "@/database";
import { bookingSchema, deleteBooking } from "../../../schemas/auth";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

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

export const DELETE = auth(async (req) => {
  if (!req.auth) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  try {
    const { id } = await deleteBooking.validate(await req.json());

    let query: any = { id };
    if (req.auth.user.role !== "admin") {
      query.BookedBy = req.auth.user.id;
    }

    const deletedCount = await Booking.destroy({
      where: query,
    });

    if (deletedCount === 0) {
      return NextResponse.json(
        { message: "Rezervácia sa nenašla alebo nepatrí vám." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Rezervácia bola úspešne odstránená." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Chyba pri odstraňovaní rezervácie:", error);
    return NextResponse.json(
      { message: "Došlo k chybe pri odstraňovaní rezervácie." },
      { status: 500 }
    );
  }
});
export const GET = auth(async (req) => {
  if (!req.auth) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  try {
    const bookings = await Booking.findAll({
      where: {
        BookedBy: req.auth.user.id,
      },
      include: { model: Room, as: "Room" },
    });

    if (bookings.length === 0) {
      return NextResponse.json(
        { message: "nemate ziadne rezervacie." },
        { status: 404 }
      );
    }

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "chyba" }, { status: 500 });
  }
});
