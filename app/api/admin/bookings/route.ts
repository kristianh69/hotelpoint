import { auth } from "@/auth";
import { Booking, Room, User } from "@/database";
import { confirmedBooking } from "@/schemas/auth";

import { NextResponse } from "next/server";

export const GET = auth(async (req) => {
  if (!req.auth || req.auth.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  try {
    const bookings = await Booking.findAll({
      include: [
        { model: Room, as: "Room" },
        {
          model: User,
          as: "User",
          attributes: ["id", "email", "name", "surname"],
        },
      ],
    });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("Chyba pri načítaní rezervácií:", error);
    return NextResponse.json({ message: "chyba" }, { status: 500 });
  }
}) as any;

export const PUT = auth(async (req) => {
  if (!req.auth || req.auth.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  try {
    const { id } = await confirmedBooking.validate(await req.json());
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return NextResponse.json(
        { error: "Rezervacia nebola nájdená" },
        { status: 404 }
      );
    }

    booking.Confirmed = true;
    await booking.save();

    return NextResponse.json(
      { message: "Izba bola úspešne aktualizovaná" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Nepodarilo sa aktualizovať izbu" },
      { status: 500 }
    );
  }
}) as any;
