"use client";

import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Room = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
};

type ReservationCardProps = {
  room: Room;
  onReserve: () => void;
};

const ReservationCard = ({ room, onReserve }: ReservationCardProps) => (
  <Card className="w-full">
    {room.imageUrl && (
      <div className="relative w-full h-40">
        <Image
          src={room.imageUrl}
          alt={room.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
    )}
    <CardHeader>
      <CardTitle>{room.name}</CardTitle>
      <CardDescription>{room.description}</CardDescription>
    </CardHeader>
    <CardFooter>
      <div className="flex justify-between items-center w-full">
        <span className="text-lg font-bold">{room.price} €/noc</span>
        <Button onClick={onReserve} className="bg-blue-600 text-white">
          Rezervovať
        </Button>
      </div>
    </CardFooter>
  </Card>
);

export default ReservationCard;
