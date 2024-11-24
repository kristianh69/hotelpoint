import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/database/users";
import { loginSchema } from "@/schemas/auth";

declare module "next-auth" {
  interface Session {
    user: {
      address: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: { email: string; password: string }) => {
        try {
          // Validácia prihlasovacích údajov pomocou loginSchema
          const validatedCredentials = await loginSchema.validate(credentials, {
            strict: true,
            abortEarly: false,
          });

          // Načítanie používateľa podľa e-mailu
          const user = await User.findOne({
            where: { email: validatedCredentials.email },
          });

          if (!user) {
            // Používateľ neexistuje
            throw new Error("Invalid credentials.");
          }

          // Porovnanie hesla s hashom uloženým v databáze
          const isPasswordValid = await bcrypt.compare(
            validatedCredentials.password,
            user.passwordHash
          );

          if (!isPasswordValid) {
            // Ak heslo nie je platné, vrátim chybu
            throw new Error("Invalid credentials.");
          }

          // Ak je všetko v poriadku, vráti sa používateľ
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error: any) {
          throw new Error(
            error.errors ? error.errors.join(", ") : "Invalid credentials."
          );
        }
      },
    }),
  ],
});
