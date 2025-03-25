import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "@/libs/userLogIn";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }