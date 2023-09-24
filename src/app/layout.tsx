import { Poppins } from 'next/font/google'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import Header from '@/components/header/Header'
import Footer from '@/components/Footer'

import Providers from '@/providers/Providers'

import '@/styles/globals.css'

interface Props {
	children: ReactNode
	authModal: ReactNode
}

export const metadata: Metadata = {
	title: 'FSW Club',
	description: 'Planeje sua próxima viagem com facilidade! Descubra hotéis incríveis e reserve sua estadia perfeita conosco. Explore uma ampla variedade de opções de hospedagem e garanta uma viagem memorável.',
	authors: [{ name: 'Gabriel', url: 'https://github.com/Gabriel-Ribeiroo' }],
}

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] })

export default function RootLayout({ children, authModal }: Props) {
	return (
		<html lang="pt-br">
			<body className={poppins.className}>
				<Providers>
					<div className="flex flex-col min-h-screen">
						<Header />
						{children}
						{authModal}
						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	)
}