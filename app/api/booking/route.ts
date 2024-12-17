"use server";
import Booking from "../../../database/bookings";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const {
    BookedBy,
    StartingDate,
    EndingDate,
    CreatedAt,
    NumberOfQuest,
    GuestList,
  } = await req.json();

  const booking = await Booking.create({
    BookedBy,
    CreatedAt,
    StartingDate,
    EndingDate,
    NumberOfQuest,
    GuestList,
  });

  return NextResponse.json(booking, { status: 200 });
};
