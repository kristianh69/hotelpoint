"use server";

import { NextApiRequest, NextApiResponse } from "next";
import Room from "../../database/rooms";
import { roomSchema } from "@/schemas/auth";
import { error } from "console";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(404).json({ message: "Not Found" });
    console.log(error);
    return;
  }

  let body;
  try {
    body = await roomSchema.validate(req.body, {
      strict: true,
      abortEarly: false,
    });
  } catch (e: any) {
    res.status(400).json({ message: "Invalid request body", error: e.errors });
    return;
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

    res
      .status(201)
      .json({ message: "Room successfully created", room: newRoom });
  } catch (errors) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
