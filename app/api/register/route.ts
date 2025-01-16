import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "@/database";
import { registerSchema } from "@/schemas/auth";

export const POST = async (req: NextRequest) => {
  let body;

  try {
    const requestBody = await req.json();
    body = await registerSchema.validate(requestBody, {
      strict: true,
      abortEarly: false,
    });
  } catch (e: any) {
    const errorMessages = e.inner.map((error: any) => error.message);
    return NextResponse.json({ errors: errorMessages }, { status: 400 });
  }

  const existingUser = await User.findOne({ where: { email: body.email } });
  if (existingUser) {
    return NextResponse.json(
      { message: "Tento e-mail už existuje." },
      { status: 400 }
    );
  }

  const hashedPassword = bcrypt.hashSync(body.password, 10);
  try {
    const newUser = await User.create({
      email: body.email,
      passwordHash: hashedPassword,
      name: body.name,
      surname: body.surname || null,
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch {
    return NextResponse.json({ status: 500 });
  }
};
