import { auth } from "@/auth";
import Reservation from "@/components/Bookings";
import { redirect } from "next/navigation";

import React from "react";

const page = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div>
      <Reservation />
    </div>
  );
};

export default page;
