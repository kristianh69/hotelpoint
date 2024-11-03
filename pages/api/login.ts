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
  const { password, email } = req.body as {
    password: string;
    email: string;
  };
  console.log(password, email);

  const user = await User.findOne({
    where: { email: email },
  });
  if (!user) {
    res.status(400).json({ message: "Uzivatel s tymito udajmi neexistuje" });
    return;
  }

  if (bcrypt.compareSync(password, user.passwordHash))
    res.status(200).json({
      name: user.name,
      surname: user.surname,
      email: user.email,
      id: user.id,
    });
  else res.status(400).json({ message: "Uzivatel s tymito udajmi neexistuje" });
}
