"use server";
import type { NextApiRequest, NextApiResponse } from "next";
import Booking from "../../database/bookings";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {
      BookedBy,
      StartingDate,
      EndingDate,
      CreatedAt,
      NumberOfQuest,
      GuestList,
    } = req.body;

    const booking = await Booking.create({
      BookedBy,
      CreatedAt,
      StartingDate,
      EndingDate,
      NumberOfQuest,
      GuestList,
    });

    return res.status(200).json(booking);
  }
};

export default handler;
