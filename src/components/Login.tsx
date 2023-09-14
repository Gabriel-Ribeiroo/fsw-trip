'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { HTMLAttributes } from 'react'

import Button from './Button'
import TextInput from './inputs/TextInput'
import ErrorMessage from './ErrorMessage'

import { Chrome, Mail, Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { twMerge } from 'tailwind-merge'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import schema, { SchemaProps } from '@/schemas/login'

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function Login({ className, ...rest }: Props) {
	const { register, handleSubmit, formState: { errors } } = useForm<SchemaProps>({
		resolver: zodResolver(schema)
	})

	const [isSubmitting, setIsSubmitting] = useState(false)
	
	const onSubmit = async (data: SchemaProps) => {
		setIsSubmitting(true)

		const logging = await signIn<'credentials'>('credentials', {
			...data,  
			redirect: false,
		})

		setIsSubmitting(false)
		console.log(logging)
	}
	
	return (
		<div 
			className={twMerge(
				"flex flex-col gap-9 w-full max-w-sm border rounded-3xl shadow-md p-8 pt-14 border-gray-300 bg-white",
				className
			)}
			{...rest}
		>
			<div className="relative w-12 h-12 self-center">
				<Image src="/logo.svg" alt="FSW Trip Logo" className="cursor-pointer" fill />
			</div>

			<form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-1">
					<TextInput 
						className="w-full" 
						placeholder="Email"
						{...register("email")}
					/>

					{errors.email?.message && <ErrorMessage message={errors.email.message} />}
				</div>

				<div className="flex flex-col gap-1">
					<TextInput
						type="password"
						className="w-full"
						placeholder="Senha"
						{...register("password")}
					/>

					{errors.password?.message && <ErrorMessage message={errors.password.message} />}
				</div>

				<Button>
					<Mail size={20} />
					{isSubmitting ? 'Entrando' : 'Email'}
					{isSubmitting && <Loader2 size={18} className="animate-spin" />}
				</Button>
			</form>
		
			<Button onClick={() => signIn('google')}>
				<Chrome size={20} />
				Google
			</Button>
		</div>
	)
}