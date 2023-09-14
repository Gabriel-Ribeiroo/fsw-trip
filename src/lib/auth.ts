import bcrypt from 'bcrypt'
import CredentialProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import type { Adapter } from 'next-auth/adapters'
import type { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
		CredentialProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'password', type: 'text', placeholder: 'email' },
				username: { label: 'username', type: 'text', placeholder: 'username' },
				password: { label: 'password', type: 'password', placeholder: 'password' }
			},
			async authorize(credentials): Promise<any> {
				if (!credentials?.email || !credentials?.password) 
					throw new Error('Dados de login necessarios')
	
				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email
					}
				})

				if (!user || !user.hashedPassword) 
					throw new Error('Usúario não registrado com credenciais') 
				
				const matchPassword = await bcrypt.compare(credentials.password, user.hashedPassword)

				if (!matchPassword)
					throw new Error('Senha incorreta') 
				 
				return user  
			}
		}),
		GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
	session: {
		strategy: 'jwt'
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				return {
					...token, 
					id: user.id, 
				}
			}

			return token 
		},
		async session({ session, token }) {
			return {
				...session, 
				user: {
					...session.user, 
					id: token.id 
				}
			} 
		}
	},
	pages: {
		signIn: '/login'
	},
	debug: process.env.NODE_ENV === 'development'
}