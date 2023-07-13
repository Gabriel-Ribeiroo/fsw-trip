'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode 
}

export default function Button({ children, className, ...rest }: Props) {
	return (
		<button
			className={twMerge('rounded-lg bg-primary text-white py-1.5 px-2 font-medium', className)}
			{...rest}
		>
			{children}
		</button>
	)
}