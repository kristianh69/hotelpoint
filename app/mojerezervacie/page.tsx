import { auth } from "@/auth";
import MyBooking from "@/components/MyBooking";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div>
      <MyBooking />
    </div>
  );
};

export default page;
