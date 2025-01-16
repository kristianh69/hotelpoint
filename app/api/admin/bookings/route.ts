import { auth } from "@/auth";
import { Booking, Room, User } from "@/database";

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
