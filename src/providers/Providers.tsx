'use client'

import { ReactNode } from 'react'

import Auth from './Auth'
import Toast from './Toast'

interface Props {
	children: ReactNode
}

export default function Providers({ children }: Props) {
	return (
		<Auth>
			{children}
			<Toast/>
		</Auth>
	)
} 
