import { auth } from "@/auth";
import ReservationCard from "@/components/ReservationCard";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div>
      <ReservationCard />
    </div>
  );
};

export default page;
