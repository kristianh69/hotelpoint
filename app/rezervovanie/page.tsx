"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DatePickerWithRange } from "@/components/ui/DatePicker";
import Link from "next/link";

// Typ pre záznam o izbe
interface Room {
  id: number;
  name: string;
  tags: string;
  description: string;
  numberOfBeds: number;
  price: number;
  imageUrl: string;
}

export default function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch("/api/rooms");
      const data = await response.json();
      setRooms(data);
    };

    fetchRooms();
  }, []);

  return (
    <div className="p-6 pt-36 bg-black min-h-screen">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <li
            key={room.id}
            className="flex flex-col justify-between bg-gray-900 border border-gray-700 rounded-lg shadow-lg hover:shadow-2xl hover:border-gray-500 transition-shadow duration-300 h-full"
          >
            <div className="flex-grow">
              <div className="overflow-hidden rounded-t-lg h-48">
                <img
                  src={room.imageUrl}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex-1 text-white">
                <h2 className="text-2xl font-semibold">{room.name}</h2>
                <p className="text-gray-400 mt-2">{room.tags}</p>
                <p className="text-gray-400 mt-2">
                  Počet postelí: {room.numberOfBeds}
                </p>
                <p className="text-green-400 font-bold mt-4 text-lg">
                  Cena: {room.price} € / noc
                </p>
              </div>
            </div>
            <div className="p-6">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-400 transition-colors duration-200"
                    onClick={() => setSelectedRoom(room)}
                  >
                    Rezervovať
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl bg-gray-900 rounded-lg shadow-lg p-8">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-white font-bold">
                      {selectedRoom?.name}
                    </DialogTitle>
                    <DialogDescription>
                      <img
                        src={selectedRoom?.imageUrl}
                        alt={selectedRoom?.name}
                        className="w-full h-64 object-cover rounded-lg mt-4"
                      />
                      <p className="mt-6 text-lg text-white">
                        {selectedRoom?.tags} <p>{selectedRoom?.description}</p>
                      </p>
                      <p className="mt-4 text-lg">
                        Počet postelí: {selectedRoom?.numberOfBeds}
                      </p>
                      <p className="mt-4 text-2xl font-bold text-green-500">
                        Cena: {selectedRoom?.price} € / noc
                      </p>
                    </DialogDescription>
                  </DialogHeader>
                  {/* Kalendár */}
                  <div className="mt-6">
                    <DatePickerWithRange />
                  </div>
                  <div className="mt-6">
                    <button
                      className="w-full py-3 px-6 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-400 transition-colors duration-200"
                      onClick={() =>
                        alert(`Rezervované izba: ${selectedRoom?.name}`)
                      }
                    >
                      Potvrdiť rezerváciu
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
