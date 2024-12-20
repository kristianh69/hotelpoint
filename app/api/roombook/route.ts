"use server";

import Room from "../../../database/rooms";
import Booking from "../../../database/bookings";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  let body;
  try {
    body = await req.json();
    const { roomId, startDate, endDate } = body;

    if (!roomId || !startDate || !endDate) {
      return NextResponse.json(
        { message: "Chýbajú požadované údaje." },
        { status: 400 }
      );
    }

    const room = await Room.findByPk(roomId);
    if (!room) {
      return NextResponse.json(
        { message: "Izba neexistuje." },
        { status: 404 }
      );
    }

    const overlappingBookings = await Booking.findAll({
      where: {
        roomId,
        startDate: { $lt: new Date(endDate) },
        endDate: { $gt: new Date(startDate) },
      },
    });

    if (overlappingBookings.length > 0) {
      return NextResponse.json(
        { message: "Izba je v tomto intervale už rezervovaná." },
        { status: 400 }
      );
    }

    const newBooking = await Booking.create({
      roomId,
      startDate,
      endDate,
    });

    return NextResponse.json(
      { message: "Rezervácia bola úspešne vytvorená.", booking: newBooking },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Chyba pri spracovaní rezervácie:", error);
    return NextResponse.json(
      { message: "Chyba na strane servera." },
      { status: 500 }
    );
  }
};
