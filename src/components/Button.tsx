'use client'

import { type ButtonHTMLAttributes, type Ref, forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'
import { Slot } from '@radix-ui/react-slot'

export const buttonVariants = tv({
	base: 'flex justify-center items-center gap-2 rounded-md p-2 font-medium text-sm',
	variants: {
		variant: {
			default: 'bg-primary text-white',
			destructive: 'text-white bg-red-500',
			defaultOutline: 'text-primary border border-primary',
			destructiveOutline: 'border border-red-500 text-red-500',
			outline: 'border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900',
			dark: 'bg-slate-900 text-slate-50 hover:bg-slate-900/90'
		}
	},

	defaultVariants: {
		variant: 'default'
	}
})

interface Props 
	extends ButtonHTMLAttributes<HTMLButtonElement>, 
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

function 
Button({ className, variant, asChild = false, ...rest }: Props, ref: Ref<HTMLButtonElement>) {
	const Comp = asChild ? Slot : 'button'
	
	return (
		<Comp
			className={twMerge(buttonVariants({ variant }), className)}
			ref={ref}
			{...rest}
		/>
	)
}

export default forwardRef(Button) 