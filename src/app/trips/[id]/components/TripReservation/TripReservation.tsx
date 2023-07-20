'use client'

import Button from '@/components/Button'
import DateInput from '@/components/inputs/DateInput'
import TextInput from '@/components/inputs/TextInput'
import ErrorMessage from '@/components/ErrorMessage'

import { Trip } from '@prisma/client'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import schema, { Form } from './schema'
import { calcReservationTotalPrice } from '@/utils/reservation'

interface Props {
	trip: Trip
}

export default function TripReservation({ trip }: Props) {
	const { register, handleSubmit, control, watch, setError, formState: { errors } } = useForm<Form>({
		resolver: zodResolver(schema)
	})

	const startDate = watch('startDate')
	const endDate = watch('endDate')

	const onSubmit = async (data: Form) => {
		const request = await fetch('http://localhost:3000/api/trip/check', {
			method: 'POST',
			body: JSON.stringify({
				startDate: data.startDate,
				endDate: data.endDate,
				trip: trip 
			})
		})

		const response = await request.json()

		if (response.error?.code === 'INVALID_START_DATE') 
			setError('startDate', { message: 'Data inválida.' })

		if (response.error?.code === 'INVALID_END_DATE')
			setError('endDate', { message: 'Data inválida.' })

		if (response.error?.code === 'TRIP_ALREADY_RESERVED') {
			setError('startDate', { message: 'Data já reservada.' })
			setError('endDate', { message: 'Data já reservada.' })
		}
	}
	
	return (
		<form className="flex flex-col gap-2 pb-10 border-b border-gray-400">
			<div className="grid grid-cols-2 gap-2">
				<div className="flex flex-col gap-0.5">
					<Controller 
						name="startDate"
						control={control}
						render={({ field }) => 
							<DateInput 
								placeholderText="Data Inicial" 
								onChange={field.onChange}
								onBlur={field.onBlur}
								selected={field.value}
								// minDate={trip.startDate}
								// maxDate={endDate ?? trip.endDate}
								hasError={!!errors.startDate}
							/>
						}
					/>
					
					{!!errors.startDate?.message && <ErrorMessage message={errors.startDate.message} />}
				</div>
				
				<div className="flex flex-col gap-0.5">
					<Controller 
						name="endDate"
						control={control}
						render={({ field }) => 
							<DateInput 
								placeholderText="Data Final" 
								onChange={field.onChange}
								onBlur={field.onBlur}
								selected={field.value}
								minDate={startDate ?? trip.startDate}
								maxDate={trip.endDate}
								hasError={!!errors.endDate} 
							/>
						}
					/>

					{!!errors.endDate?.message && <ErrorMessage message={errors.endDate.message} />}
				</div>
			</div>

			<div className="flex flex-col gap-0.5">
				<TextInput  
					placeholder={`Número de Hóspedes (max: ${trip.maxGuests})`} 
					hasError={!!errors.guests}
					{...register('guests')}
				/>

				{!!errors.guests?.message && <ErrorMessage message={errors.guests.message} />}
			</div>

			<div className="flex justify-between">
				<p className="font-medium text-sm text-primary-darker">Total: </p>
				<p className="font-medium text-sm text-primary-darker">
					R$ {(startDate && endDate) 
						? calcReservationTotalPrice(startDate, endDate, (trip.pricePerDay as unknown as number))
						: '0'
					}
				</p>
			</div>

			<Button onClick={handleSubmit(onSubmit)}>Reservar</Button>
		</form> 
	)
}