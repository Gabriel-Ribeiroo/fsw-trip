'use client'

import { useRouter } from 'next/navigation'

import TextInput from '@/components/inputs/TextInput'
import CurrencyInput from '@/components/inputs/CurrencyInput'
import Button from '@/components/Button'

import DatePicker from '@/components/inputs/DatePicker'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import schema, { Form } from '@/schemas/search'
import ErrorMessage from '@/components/ErrorMessage'

export default function TripSearch() {
	const { register, handleSubmit, control, formState: { errors } } = useForm<Form>({
		resolver: zodResolver(schema)
	})

	const router = useRouter() 
	
	const onSubmit = (data: Form) => {
		const { location, initialDate, budget } = data
	
		router.push(`
			/trips/search
			${location ? `?location=${location}` : ''}
			${initialDate ? `&initialDate=${initialDate}` : ''}
			${budget ? `&budget=${budget}` : ''}
		`)		
	}

	return (
		<form 
			className="flex flex-col gap-4 w-full max-w-[59.25rem] mx-auto rounded-md
			md:p-4 md:flex-row justify-center md:bg-primary/25"
		>
			<div className="flex flex-col gap-1 w-full">
				<TextInput 
					placeholder="Onde você quer ir?" 
					autoComplete="off" 
					hasError={!!errors.location?.message}
					{...register('location')} 
				/>

				{errors.location?.message && <ErrorMessage message={errors.location?.message} />}
			</div>
			
			<div className="grid grid-cols-2 gap-4 w-full">
				<div className="flex flex-col gap-1">
					<Controller  
						name="budget"
						control={control}
						render={({ field }) => (
							<CurrencyInput 
								placeholder="Orçamento"
								autoComplete="off"
								hasError={!!errors.budget?.message}
								{...field} 
							/>
						)}
					/>

					{errors.budget?.message && <ErrorMessage message={errors.budget?.message} />}
				</div>

				<div className="flex flex-col gap-1">
					<Controller 
						name="initialDate"
						control={control}
						render={({ field }) => (
							<DatePicker 
								placeholder="Dia"		
								fromDate={new Date()}
								selected={field.value}		
								onDayClick={field.onChange}
								hasError={!!errors.initialDate?.message}
							/>	
						)}
					/>

					{errors.initialDate?.message && <ErrorMessage message={errors.initialDate?.message} />}
				</div>
			</div>

			<Button 
				className="md:w-1/2 md:self-start"
				onClick={handleSubmit(onSubmit)} 
			>
				Buscar
			</Button>
		</form>
	)
}