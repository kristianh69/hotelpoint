import type { NextApiRequest, NextApiResponse } from "next";
import Booking from "../../database/bookings";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const bookings = await Booking.findAll();
    bookings;
  }
};

export default handler;
