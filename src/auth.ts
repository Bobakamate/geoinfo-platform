// auth.ts (à la racine du projet, pas dans lib/)
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  
  session: {
    strategy: "jwt",
  },
  
  pages: {
    signIn: "/login",
    error: "/login",
  },
  
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("SignIn callback:", { user, account, profile })
      return true
    },
    
    async redirect({ url, baseUrl }) {
      console.log("Redirect callback:", { url, baseUrl })
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    
    async session({ session, token }) {
      console.log("Session callback:", { session, token })
      if (token && session.user) {
        session.user.id = token.sub!
      }
      return session
    },
    
    async jwt({ token, user }) {
      console.log("JWT callback:", { token, user })
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  
  events: {
    async signIn({ user }) {
      console.log("User signed in:", user)
    },
  },
})