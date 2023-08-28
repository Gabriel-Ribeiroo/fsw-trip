import GoogleProvider from 'next-auth/providers/google'
import type { Adapter } from 'next-auth/adapters'
import type { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async session({ session, user }) {
			session.user = { ...session.user, id: user.id } as { id: string; name: string; email: string }
			return session 
		}
	},
	pages: {
		signIn: '/login'
	},
}