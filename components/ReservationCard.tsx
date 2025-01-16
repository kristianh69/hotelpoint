"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DatePickerWithRange } from "@/components/ui/DatePicker";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Room } from "@/interfaces";

export default function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const session = useSession();

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch("api/rooms");
      const data = await response.json();
      setRooms(data);
    };

    fetchRooms();
  }, []);

  const calculateTotalPrice = (room: Room | null): number => {
    return room ? room.price * numberOfNights : 0;
  };

  const resetReservation = () => {
    setNumberOfNights(0);
    setFromDate(null);
    setToDate(null);
  };

  const bookRoom = async () => {
    if (!selectedRoom) return;
    try {
      const confirmBook = window.confirm("Podvtdte rezervaciu?");
      if (!confirmBook) return;

      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          RoomId: selectedRoom.id,
          StartingDate: fromDate,
          EndingDate: toDate,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message);
        return;
      }

      toast.success(
        `Izba bola úspešne rezervovaná. Celková cena: ${calculateTotalPrice(
          selectedRoom
        )} €`
      );
      resetReservation();
    } catch (error) {
      toast.error("Chyba pri rezervovaní izby.");
    }
  };

  const deactivateRoom = async (roomId: number) => {
    try {
      const confirmDeactivation = window.confirm(
        "Naozaj chcete deaktivovať túto izbu?"
      );
      if (!confirmDeactivation) return;

      const response = await fetch(`/api/admin/deleteroom`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: roomId }),
      });

      const result = await response.json();
      if (!response.ok) {
        toast.error(result.error);
        return;
      }

      toast.success(result.message);
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === roomId ? { ...room, active: true } : room
        )
      );
    } catch (error) {
      toast.error("Nepodarilo sa deaktivovať izbu");
    }
  };

  return (
    <div className="p-6 pt-36 bg-black min-h-screen">
      <div className=" absolute top-20 right-6">
        <a
          href="/mojerezervacie"
          className="py-3 px-6 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-400 transition-colors duration-200"
        >
          Moje rezervovacie
        </a>
      </div>
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
              {session.data?.user.role === "admin" && (
                <button
                  className="w-full py-2 px-4 bg-red-500 text-white font-medium rounded-lg hover:bg-green-400 transition-colors duration-200 mb-2"
                  onClick={() => deactivateRoom(room.id)}
                >
                  deaktivovať izbu
                </button>
              )}
              <Dialog onOpenChange={(open) => !open && resetReservation()}>
                <DialogTrigger asChild>
                  <button
                    className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-400 transition-colors duration-200"
                    onClick={() => setSelectedRoom(room)}
                  >
                    Rezervovať
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl lg:h-[700px]  bg-gray-900 rounded-lg shadow-lg p-8 overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-3xl pb-5 text-white font-bold">
                      {selectedRoom?.name}
                    </DialogTitle>
                    <img
                      src={selectedRoom?.imageUrl || ""}
                      alt={selectedRoom?.name || ""}
                      className="w-full h-64 object-cover rounded-lg mt-4"
                    />
                    <div className="mt-6 text-lg text-white pt-5">
                      {selectedRoom?.tags}
                      <p className="">{selectedRoom?.description}</p>
                    </div>
                    <p className="mt-4 text-lg text-gray-400">
                      Počet postelí: {selectedRoom?.numberOfBeds}
                    </p>
                    <p className="mt-4 text-2xl font-bold text-green-500">
                      Cena: {selectedRoom?.price} € / noc
                    </p>
                  </DialogHeader>
                  {/* Kalendár */}
                  <div className="mt-6">
                    <DatePickerWithRange
                      onDateChange={(nights, fromDate, toDate) => {
                        setNumberOfNights(nights);
                        setFromDate(fromDate);
                        setToDate(toDate);
                      }}
                    />
                  </div>
                  <div className="mt-4 text-xl font-bold text-white">
                    Celková cena:{" "}
                    <span className="text-green-500">
                      {calculateTotalPrice(selectedRoom)} €
                    </span>
                  </div>

                  <div className="mt-6">
                    <button
                      className="w-full py-3 px-6 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-400 transition-colors duration-200"
                      onClick={bookRoom}
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
