'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
	base: 'rounded-lg py-1.5 px-2 font-medium',
	variants: {
		variant: {
			default: 'bg-primary text-white',
			destructive: 'text-white bg-red-500',
			defaultOutline: 'text-primary border border-primary',
			destructiveOutline: 'border border-red-500 text-red-500',
		}
	}
})

type ButtonVariants = VariantProps<typeof button> 

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {
	children: ReactNode 
}

export default function Button({ children, className, variant = 'default', ...rest }: Props) {
	return (
		<button
			className={twMerge(button({ variant }), className)}
			{...rest}
		>
			{children}
		</button>
	)
}