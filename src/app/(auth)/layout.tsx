import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'FWS - Autenticação',
	description: 'Gerencie o acesso seguro à sua conta no FSW. Faça login ou registre-se para aproveitar todos os recursos e funcionalidades personalizadas.',
}

interface Props {
	children: ReactNode
}

export default function AuthenticationLayout({ children }: Props) {
	return (
		<main className="flex-1 flex justify-center items-start pt-6">
			{children}
		</main>
	)
}