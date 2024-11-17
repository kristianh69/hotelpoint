import type { NextApiRequest, NextApiResponse } from "next";
import Room from "../../database/rooms";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, NumberOfbeds, description, tags, price } = req.body;

    await Room.create({
      name,
      NumberOfbeds,
      description,
      tags,
      price,
    });

    res.status(201).end();
  } else {
    0;
    res.status(405).end();
  }
};

export default handler;
