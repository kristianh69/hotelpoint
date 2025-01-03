import { auth } from "@/auth";
import Bookings from "@/components/Bookings";

import { redirect } from "next/navigation";

import React from "react";

const page = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div>
      <Bookings />
    </div>
  );
};

export default page;
