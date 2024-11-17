import type { NextApiRequest, NextApiResponse } from "next";
import Room from "../../database/rooms";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const rooms = await Room.findAll();
  rooms;
};

export default handler;
