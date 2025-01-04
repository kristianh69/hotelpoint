import { auth } from "@/auth";
import AddRoomForm from "@/components/addroom";

import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") redirect("/login");
  return (
    <div>
      <AddRoomForm />
    </div>
  );
};

export default page;
