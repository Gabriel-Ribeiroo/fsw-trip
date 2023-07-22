import { ReactNode } from 'react'
import { Poppins } from 'next/font/google'

import Header from '@/components/header/Header'
import Footer from '@/components/Footer'

import Providers from '@/providers/Providers'

import '@/styles/globals.css'

interface Props {
	children: ReactNode
}

export const metadata = {
	title: 'FSW Club'
}

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] })

export default function RootLayout({ children }: Props) {
	return (
		<html lang="pt-br">
			<body className={poppins.className}>
				<Providers>
					<div className="flex flex-col min-h-screen">
						<Header />
						{children}
						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	)
}