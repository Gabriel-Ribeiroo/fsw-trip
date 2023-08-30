'use client'

import Image from 'next/image'
import type { HTMLAttributes } from 'react'

import Button from './Button'

import { AiOutlineGoogle } from 'react-icons/ai'
import { signIn } from 'next-auth/react'
import { twMerge } from 'tailwind-merge'

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function Login({ className, ...rest }: Props) {
	return (
		<div 
			className={twMerge(
				"flex flex-col gap-9 w-full max-w-sm border rounded-3xl shadow-md p-6 pt-14 border-gray-300 bg-white",
				className
			)}
			{...rest}
		>
			<div className="relative w-12 h-12 self-center">
				<Image src="/logo.svg" alt="FSW Trip Logo" className="cursor-pointer" fill />
			</div>
		
			<Button onClick={() => signIn('google')}>
				<AiOutlineGoogle size={20} />
				Google
			</Button>
		</div>
	)
}