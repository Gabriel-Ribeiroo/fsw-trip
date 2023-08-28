'use client'

import type { ButtonHTMLAttributes } from 'react'

import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'
import { Slot } from '@radix-ui/react-slot'

const button = tv({
	base: 'flex justify-center items-center gap-2 rounded-md p-2 font-medium',
	variants: {
		variant: {
			default: 'bg-primary text-white',
			destructive: 'text-white bg-red-500',
			defaultOutline: 'text-primary border border-primary',
			destructiveOutline: 'border border-red-500 text-red-500',
		}
	}
})

interface Props 
	extends ButtonHTMLAttributes<HTMLButtonElement>, 
		VariantProps<typeof button> {
	asChild?: boolean
}

export default function 
Button({ className, asChild = false, variant = 'default', ...rest }: Props) {
	const Comp = asChild ? Slot : 'button'
	
	return (
		<Comp
			className={twMerge(button({ variant }), className)}
			{...rest}
		/>
	)
}