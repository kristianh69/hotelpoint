import { auth } from "@/auth";
import { Room } from "@/database";
import { roomSchema } from "@/schemas/auth";
import { NextResponse } from "next/server";

export const POST = auth(async (req) => {
  if (!req.auth || req.auth.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

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
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}) as any;
