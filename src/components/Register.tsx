'use client'

import Image from 'next/image'
import { type HTMLAttributes, useState } from 'react'

import Button from '@/components/Button'
import TextInput from '@/components/inputs/TextInput'
import ErrorMessage from '@/components/ErrorMessage'

import { Loader2 } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import schema, { type FormProps } from '@/schemas/register'
import { type UserRegistrationResponse } from '@/types/register'

interface Props extends HTMLAttributes<HTMLDivElement> {
	className?: string 
}

export default function Register({ className, ...rest }: Props) {
	const { register, handleSubmit, setError, formState: { errors }, } = useForm<FormProps>({
		resolver: zodResolver(schema)
	})

	const [isSubmitting, setIsSubmitting] = useState(false)
	
	const onSubmit = async (data: FormProps) => {
		if (isSubmitting) return
		
		setIsSubmitting(true)

		const request = await fetch('api/auth/user', {
			method: 'POST',
			body: JSON.stringify({
				username: data.username, 
				email: data.email,
				password: data.password
			})
		}) 

		const response: UserRegistrationResponse = await request.json()

		setIsSubmitting(false)

		if (response.error) {
			response.errors.forEach(error => (
				setError(error.field, { message: error.message })
			))
		}
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
					<label htmlFor="username" className="sr-only">Nome</label>
					<TextInput
						id="username"
						className="w-full"
						placeholder="Nome"
						autoCorrect="off"
						disabled={isSubmitting}
						{...register("username")}
					/>

					{errors.username?.message && <ErrorMessage message={errors.username.message} />}
				</div>

				<div className="flex flex-col gap-1">
					<label htmlFor="email" className="sr-only">Email</label>
					<TextInput
						id="email"
						className="w-full"
						placeholder="Email"
						autoCorrect="off"
						disabled={isSubmitting}
						{...register("email")}
					/>

					{errors.email?.message && <ErrorMessage message={errors.email.message} />}
				</div>

				<div className="flex flex-col gap-1">
					<label htmlFor="password" className="sr-only">Senha</label>
					<TextInput
						id="password"
						type="password"
						className="w-full"
						placeholder="Senha"
						disabled={isSubmitting}
						{...register("password")}
					/>

					{errors.password?.message && <ErrorMessage message={errors.password.message} />}
				</div>

				<Button disabled={isSubmitting}> 
					{isSubmitting ? "Registrando" : "Registrar"}
					{isSubmitting && <Loader2 className="animate-spin" size={18} />}
				</Button>
			</form>
		</div>
	) 
}