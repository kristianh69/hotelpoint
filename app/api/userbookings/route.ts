import { auth } from "@/auth";
import Booking from "../../../database/bookings";

import { NextResponse } from "next/server";
import User from "@/database/users";

export const GET = auth(async (req) => {
  if (!req.auth) {
    return NextResponse.json(
      { message: "Neautorizovaný prístup." },
      { status: 401 }
    );
  }

  try {
    const bookings = await Booking.findAll({
      where: { BookedBy: req.auth.user.id },
      attributes: ["id", "RoomId", "StartingDate", "EndingDate", "CreatedAt"],
      include: [
        {
          model: User,
          attributes: ["name", "surname", "email"],
        },
      ],
      raw: true,
    });
    console.log("AA BB", bookings);

    if (bookings.length === 0) {
      return NextResponse.json(
        { message: "Nemáte žiadne rezervácie." },
        { status: 404 }
      );
    }

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("chyba", error);
    return NextResponse.json(
      { message: "Došlo k chybe pri načítaní rezervácií." },
      { status: 500 }
    );
  }
});
