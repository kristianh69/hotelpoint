import { auth } from "@/auth";
import AddRoom from "@/components/AddRoom";

import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") redirect("/login");
  return (
    <div>
      <AddRoom />
    </div>
  );
};

export default page;
