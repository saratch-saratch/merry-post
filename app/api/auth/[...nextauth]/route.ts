import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Providers from "next-auth/providers";
import prisma from "@/prisma/prisma";
import bcrypt from "bcryptjs";

export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { username: credentials?.username },
        });
        if ((credentials?.password, user?.password)) {
          return { id: user.id, name: user.username };
        } else {
          throw new Error("Invalid username or password");
        }
      },
    }),
  ],
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
