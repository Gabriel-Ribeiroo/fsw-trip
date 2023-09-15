'use client'

import { ReactNode } from 'react'

import Auth from './Auth'

import { Toaster } from '@/components/ui/Toaster'

interface Props {
	children: ReactNode
}

export default function Providers({ children }: Props) {
	return (
		<Auth>
			{children}
			<Toaster />
		</Auth>
	)
} 
