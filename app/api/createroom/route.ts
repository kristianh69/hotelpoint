"use server";

import Room from "../../../database/rooms";
import { roomSchema } from "@/schemas/auth";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  let body;
  try {
    body = await roomSchema.validate(await req.json(), {
      strict: true,
      abortEarly: false,
    });
  } catch (e: any) {
    return NextResponse.json(
      { message: "Invalid request body", errors: e.errors },
      { status: 400 }
    );
  }

  try {
    const newRoom = await Room.create({
      name: body.name,
      numberOfBeds: body.numberOfBeds,
      tags: body.tags,
      description: body.description,
      price: body.price,
      imageUrl: body.imageUrl,
    });

    return NextResponse.json(newRoom, { status: 201 });
  } catch (errors) {
    console.log(errors);
    return NextResponse.json(
      { message: "something  went wrong" },
      { status: 500 }
    );
  }
};
