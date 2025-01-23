"use server";

import { NextRequest, NextResponse } from "next/server";
import { Booking, Room } from "@/database";
import { Op, fn, col } from "sequelize";

export const GET = async (req: NextRequest) => {
  const startingDate = req.nextUrl.searchParams.get("startingDate");
  const endingDate = req.nextUrl.searchParams.get("endingDate");
  let rooms: Room[];
  if (!startingDate || !endingDate) {
    rooms = await Room.findAll({ where: { active: true } });
  } else {
    const overlappingIds = (
      await Booking.findAll({
        attributes: [[fn("DISTINCT", col("RoomId")), "RoomId"]],
        where: {
          [Op.or]: [
            {
              StartingDate: {
                [Op.between]: [startingDate, endingDate],
              },
            },
            {
              EndingDate: {
                [Op.between]: [startingDate, endingDate],
              },
            },
          ],
        },
      })
    ).map((i) => i.RoomId);
    rooms = await Room.findAll({
      where: { active: true, id: { [Op.notIn]: overlappingIds } },
    });
  }
  return NextResponse.json(rooms, { status: 200 });
};
