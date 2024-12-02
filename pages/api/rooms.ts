"use server";

import type { NextApiRequest, NextApiResponse } from "next";
import Room from "../../database/rooms";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const rooms = await Room.findAll();
  res.status(200).json(rooms);
};

export default handler;
