"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

type Room = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
};

type ReservationCardProps = {
  room: Room;
};

const ReservationCard = ({ room }: ReservationCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Otváranie/zatváranie dialógu
  const toggleDialog = () => setIsOpen(!isOpen);

  return (
    <div className="w-full">
      <div className="relative w-full h-40">
        <Image
          src={room.imageUrl || "/default-image.png"}
          alt={room.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold">{room.name}</h3>
        <p>{room.description}</p>
        <span className="text-lg font-bold">{room.price} €/noc</span>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-blue-600 text-white mt-4"
              onClick={toggleDialog}
            >
              Rezervovať
            </Button>
          </DialogTrigger>
          <DialogContent className="p-6 space-y-4">
            <h2 className="text-lg font-bold mb-2">{room.name}</h2>
            <div>
              <Image
                src={room.imageUrl || "/default-image.png"}
                alt={room.name}
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
            <p>{room.description}</p>
            <span className="text-lg font-bold">{room.price} €/noc</span>
            <Button
              className="w-full bg-blue-600 text-white mt-4"
              onClick={toggleDialog}
            >
              Potvrdiť rezerváciu
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ReservationCard;
