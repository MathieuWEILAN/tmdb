import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

const githubId: string = process.env.GITHUB_ID;
const githubSecret: string = process.env.GITHUB_SECRET;
const googleId: string = process.env.GOOGLE_ID;
const googleSecret: string = process.env.GOOGLE_SECRET;

if (!githubId || !githubSecret || !googleId || !googleSecret) {
  throw new Error(
    "Missing githubId or githubSecret or googleId or googleSecret in .env"
  );
}
export const authConfig = {
  providers: [
    GitHubProvider({
      clientId: githubId,
      clientSecret: githubSecret,
    }),
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleSecret,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
} satisfies NextAuthOptions;

export default NextAuth(authConfig);
