"use client";

import { useState } from "react";

const RoomFilters = () => {
  const [guests, setGuests] = useState(1);

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold">Filtre</h2>
      <label htmlFor="guests" className="block mt-2">
        Počet hostí:
      </label>
      <input
        type="number"
        id="guests"
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        className="border p-2 rounded w-full"
      />
      {/* Tu môžete pridať ďalšie filtre */}
    </div>
  );
};

export default RoomFilters;
