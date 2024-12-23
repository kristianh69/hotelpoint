"use server";

import { NextResponse } from "next/server";
import Room from "../../../database/rooms";

export const GET = async () => {
  const rooms = await Room.findAll();
  return NextResponse.json(rooms, { status: 200 });
};