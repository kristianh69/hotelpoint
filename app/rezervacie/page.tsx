import { auth } from "@/auth";
import Reservation from "@/components/Reservation";
import { redirect } from "next/navigation";

import React from "react";

const page = async () => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") redirect("/login");
  return (
    <div>
      <Reservation />
    </div>
  );
};

export default page;
