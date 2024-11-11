import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import User from "../../database/users";
import { registerSchema } from "@/schemas/auth"; // Skontroluj, že `registerSchema` má správnu validáciu pre údaje

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(404).json({ message: "Not Found" });
    return;
  }

  // Log pre zobrazenie tela požiadavky
  console.log("Request body:", req.body);

  // Validácia tela požiadavky
  let body;
  try {
    body = await registerSchema.validate(req.body, {
      strict: true,
      abortEarly: false,
    });
    console.log("Validated body:", body);
  } catch (e: any) {
    res.status(400).json({ message: "Invalid request body", error: e.errors });
    return;
  }

  // Skontroluj, či email už neexistuje
  const existingUser = await User.findOne({ where: { email: body.email } });
  if (existingUser) {
    res.status(400).json({ message: "Email already in use" });
    return;
  }

  // Vytvorenie používateľa
  const hashedPassword = bcrypt.hashSync(body.password, 10);
  try {
    const newUser = await User.create({
      email: body.email,
      passwordHash: hashedPassword,
      name: body.name,
      surname: body.surname || null,
    });

    res
      .status(201)
      .json({ message: "User successfully created", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
