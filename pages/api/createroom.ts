import type { NextApiRequest, NextApiResponse } from "next";
import Room from "../../database/rooms";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, NumberOfbeds, description, tags, price } = req.body;

    if (!name || !NumberOfbeds || !price) {
      return res.status(400).json({ error: "Chýbajú povinné údaje" });
    }

    try {
      const room = await Room.create({
        name,
        NumberOfbeds,
        description,
        tags,
        price,
      });
      res.status(200).json({ room });
    } catch {
      res.status(500).json({ error: "Nepodarilo sa vytvoriť miestnosť" });
    }
  }
};

export default handler;
