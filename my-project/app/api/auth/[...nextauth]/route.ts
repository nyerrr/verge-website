// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./../../../lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, user }) {
      // TypeScript now knows about id and userType
      if (session.user) {
        session.user.id = user.id
        session.user.userType = user.userType || 'user'
      }
      return session
    },
    async signIn({ user }) {
      // Auto-assign admin role to specific emails
      const adminEmails = ['admin@example.com', 'youremail@gmail.com']
      
      if (user.email && adminEmails.includes(user.email)) {
        await prisma.user.update({
          where: { email: user.email },
          data: { userType: "admin" }
        })
      }
      return true
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }