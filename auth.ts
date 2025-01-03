import NextAuth, { CredentialsSignin, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schemas/auth";
import bcrypt from "bcrypt";
import { ValidationError } from "yup";
import { User } from "@/database";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

class SomethingWentWrong extends CredentialsSignin {
  code = " Something Went Wrong";
}

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      email: string;
      id: string;
      role: "user" | "admin";
    } & DefaultSession["user"];
  }
}

export const { handlers, auth } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = loginSchema.validateSync(credentials, {
            strict: true,
          });
          const user = await User.findOne({
            where: { email: email },
          });
          console.log(user);
          if (!user || !bcrypt.compareSync(password, user.passwordHash))
            throw new InvalidLoginError();
          return {
            email: user.email,
            id: user.id,
            role: user.role,
          };
        } catch (e) {
          if (e instanceof CredentialsSignin) throw e;
          if (e instanceof ValidationError) throw new InvalidLoginError();
          console.log(e);
          throw new SomethingWentWrong();
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as "user" | "admin";
      return session;
    },
  },
});
