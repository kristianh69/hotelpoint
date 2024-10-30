"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ReservationPage() {
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [guests, setGuests] = useState(1);

  const handleReservation = () => {
    alert(
      `Rezervácia úspešná! Príchod: ${arrivalDate}, Odchod: ${departureDate}, Počet hostí: ${guests}`
    );
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Rezervácia izby
          </h1>
        </CardHeader>
        <CardContent>
          <label className="block mb-4">
            <span className="text-gray-700">Dátum príchodu</span>
            <Input
              type="date"
              className="mt-1 w-full"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Dátum odchodu</span>
            <Input
              type="date"
              className="mt-1 w-full"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Počet hostí</span>
            <Input
              type="number"
              className="mt-1 w-full"
              value={guests}
              min={1}
              onChange={(e) => setGuests(Number(e.target.value))}
            />
          </label>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleReservation}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Rezervovať
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
