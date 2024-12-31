import { auth } from "@/auth";
import Booking from "../../../database/bookings";
import { NextResponse } from "next/server";

export const DELETE = auth(async (req) => {
  if (!req.auth) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  try {
    const { id } = await req.json();

    const deletedCount = await Booking.destroy({
      where: {
        id,
        BookedBy: req.auth.user.id,
      },
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
