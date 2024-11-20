import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt"; // pre porovnávanie hashovaného hesla
import User from "@/database/users"; // predpokladám, že toto je vaša databázová entita

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: {
        email: any;
        password: string | Buffer;
      }) => {
        let user = null;

        // Načítanie používateľa podľa e-mailu
        user = await User.findOne({ where: { email: credentials?.email } });

        if (!user) {
          // Používateľ neexistuje
          throw new Error("Invalid credentials.");
        }

        // Porovnanie hesla s hashom uloženým v databáze
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
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
      },
    }),
  ],
});
