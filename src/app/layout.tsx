import { ReactNode } from 'react'
import { Inter } from 'next/font/google'

import '@/styles/globals.css'

interface Props {
	children: ReactNode
}

export const metadata = {
	title: 'FSW Club'
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: Props) {
	return (
		<html lang="pt-br">
			<body className={inter.className}>
				{children}
			</body>
		</html>
	)
}