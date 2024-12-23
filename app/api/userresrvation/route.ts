import { auth } from "@/auth"; // Predpokladám, že máte autentifikačnú logiku
import Booking from "../../../database/bookings";

import { NextResponse } from "next/server";

export const GET = auth(async (req) => {
  if (!req.auth) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  try {
    const bookings = await Booking.findAll({
      where: { BookedBy: req.auth.user.id },
    });

    // Ak používateľ nemá žiadne rezervácie
    if (bookings.length === 0) {
      return NextResponse.json(
        { message: "No bookings found for this user." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
});
