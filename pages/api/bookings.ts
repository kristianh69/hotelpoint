import type { NextApiRequest, NextApiResponse } from "next";
import Booking from "../../database/bookings";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const bookings = await Booking.findAll();
      return res.status(200).json(bookings);
    } 

};

export default handler;
