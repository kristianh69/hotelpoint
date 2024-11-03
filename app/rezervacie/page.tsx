"use client";

import { useState } from "react";
import ReservationCard from "@/components/ResrvationCard";

type Room = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
};

const sampleRooms: Room[] = [
  {
    id: 1,
    name: "Izba s výhľadom na more",
    description: "Krásna izba s výhľadom na more.",
    price: 120,
    imageUrl: "/obr3.png",
  },
  {
    id: 2,
    name: "Štandardná izba",
    description: "Pohodlná štandardná izba.",
    price: 90,
    imageUrl: "/obr3.png",
  },
];

const ReservationsPage = () => {
  const [rooms, setRooms] = useState<Room[]>(sampleRooms);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Rezervácie</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {rooms.map((room) => (
          <ReservationCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default ReservationsPage;
