'use client'

import TextInput from '@/components/inputs/TextInput'
import DateInput from '@/components/inputs/DateInput'
import CurrencyInput from '@/components/inputs/CurrencyInput'
import Button from '@/components/Button'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import schema, { Form } from '@/schemas/search'
import ErrorMessage from '@/components/ErrorMessage'

export default function TripSearch() {
	const { register, handleSubmit, control, formState: { errors } } = useForm<Form>({
		resolver: zodResolver(schema)
	})
	
	const onSubmit = (data: Form) => {
		console.log(data)
	}

	console.log('Att')

	return (
		<form className="flex flex-col gap-4">
			<div className="flex flex-col gap-1">
				<TextInput 
					placeholder="Onde você quer ir?" 
					autoComplete="off" 
					hasError={!!errors.location?.message}
					{...register('location')} 
				/>

				{errors.location?.message && <ErrorMessage message={errors.location?.message} />}
			</div>
			
			<div className="grid grid-cols-2 gap-4">
				<div className="flex flex-col gap-1">
					<Controller 
						name="initialDate"
						control={control}
						render={({ field }) => (
							<DateInput 
								placeholderText="Primeira Data" 
								onChange={field.onChange}							
								onBlur={field.onBlur}
								selected={field.value}
								hasError={!!errors.initialDate?.message}
								minDate={new Date()}
							/>
						)}
					/>

					{errors.initialDate?.message && <ErrorMessage message={errors.initialDate?.message} />}
				</div>

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
			</div>

			<Button onClick={handleSubmit(onSubmit)}>Buscar</Button>
		</form>
	)
}