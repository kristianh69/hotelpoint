import { auth } from "@/auth";
import Booking from "../../../database/bookings";

import { NextResponse } from "next/server";

export const GET = auth(async (req) => {
  if (!req.auth) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  try {
    const bookings = await Booking.findAll({
      where: { BookedBy: req.auth.user.id },
      attributes: ["id", "roomId", "StartingDate", "EndingDate"],
    });

    if (bookings.length === 0) {
      return NextResponse.json(
        { message: "nama ziadne rezervacie." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "chyba" }, { status: 500 });
  }
});
