import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Prevent Vercel/edge from caching session — each request must use the request's cookies
export const dynamic = "force-dynamic";
export const revalidate = 0;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
