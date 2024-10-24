import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../database/users";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(404).json({ message: "Not Found" });
    return;
  }
  // TODO add request type checking
  const { name, password, email } = req.body as {
    name: string;
    password: string;
    email: string;
  };
  console.log(name, password, email);

  const user = await User.build({
    name,
    email,
    passwordHash: bcrypt.hashSync(password, 10),
  }).save();

  res.status(201).json({ id: user.id });
}
