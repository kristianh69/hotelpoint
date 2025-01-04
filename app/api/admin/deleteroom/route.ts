import { auth } from "@/auth";
import { Room } from "@/database";
import { deleteBooking } from "@/schemas/auth";
import { NextResponse } from "next/server";

export const PUT = auth(async (req) => {
  if (!req.auth || req.auth.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  try {
    const { id } = await deleteBooking.validate(await req.json());
    const room = await Room.findByPk(id);

    if (!room) {
      return NextResponse.json(
        { error: "Izba nebola nájdená" },
        { status: 404 }
      );
    }

    room.active = true;
    await room.save();

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
});
