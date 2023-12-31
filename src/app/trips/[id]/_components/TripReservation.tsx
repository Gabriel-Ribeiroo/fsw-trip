'use client'

import { useRouter } from 'next/navigation'

import Button from '@/components/Button'
import DatePicker from '@/components/inputs/DatePicker'
import TextInput from '@/components/inputs/TextInput'
import ErrorMessage from '@/components/ErrorMessage'

import { Trip } from '@prisma/client'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import createDynamicSchema, { Form } from '@/schemas/reservation'
import { calcReservationTotalPrice } from '@/utils/reservation'
import { differenceInDays } from 'date-fns'
import { useToast } from '@/components/ui/use-toast'
import type { ReservationResponse } from '@/types/reservation'

interface Props {
	trip: Trip
}

export default function TripReservation({ trip }: Props) {
	const { register, handleSubmit, control, watch, setError, formState: { errors } } = useForm<Form>({
		resolver: zodResolver(createDynamicSchema(trip.maxGuests, trip.startDate, trip.endDate)),
	})

	const router = useRouter() 

	const { toast } = useToast()

	const startDate = watch('startDate')
	const endDate = watch('endDate')

	const onSubmit = async (data: Form) => {
		const request = await fetch('/api/trip/check', {
			method: 'POST',
			body: JSON.stringify({
				startDate: data.startDate,
				endDate: data.endDate,
				tripId: trip.id,
				guests: data.guests
			})
		})

		const response: ReservationResponse = await request.json()

		if (response.error) {
			if (response.isAlert) {
				return toast({
					title: 'Ooopss...',
					variant: "destructive",
					description: response.message
				})
			}

			return response.errors?.forEach(error => setError(error.field, { message: error.message }))
		}

		router.push(`
			/trips/${trip.id}
			/confirmation?startDate=${data.startDate.toISOString()}
			&endDate=${data.endDate.toISOString()}
			&guests=${data.guests}
		`)
	}
	
	return (
		<form 
			className="flex flex-col gap-2 pb-5 border-b border-gray-400 
			lg:order-2 lg:p-5 lg:shadow-md lg:min-w-[23.75rem]
			lg:rounded-md lg:border lg:border-gray-300"
		>
			<p className="hidden md:block">
				<span className="font-semibold">R$ {Number(trip.pricePerDay)}</span> por dia				
			</p>

			<div className="grid grid-cols-2 gap-2">
				<div className="flex flex-col gap-0.5">
					<Controller 
						name="startDate"
						control={control}
						render={({ field }) => 
							<DatePicker 
								placeholder="Data Inicial" 
								onDayClick={field.onChange}
								selected={field.value}
								fromDate={new Date(trip.startDate.getTime() + 24 * 60 * 60 * 1000)}
								toDate={endDate || trip.endDate}
								hasError={!!errors.startDate?.message}
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
							<DatePicker 
								placeholder="Data Final" 
								onDayClick={field.onChange}
								selected={field.value}
								hasError={!!errors.endDate?.message}
								fromDate={startDate || trip.startDate}
								toDate={trip.endDate}
							/>
						}
					/>

					{!!errors.endDate?.message && <ErrorMessage message={errors.endDate.message} />}
				</div>
			</div>

			<div className="flex flex-col gap-0.5">
				<TextInput  
					type="number"
					placeholder={`Número de Hóspedes (max: ${trip.maxGuests})`} 
					hasError={!!errors.guests}
					{...register("guests", { valueAsNumber: true })}
				/>

				{!!errors.guests?.message && <ErrorMessage message={errors.guests.message} />}
			</div>

			<div className="flex justify-between">
				<p className="font-medium text-sm text-primary-darker">
					Total {(startDate && endDate) && `(${differenceInDays(endDate, startDate)} noites)`}
				</p>
				
				<p className="font-medium text-sm text-primary-darker">
					R$ {(startDate && endDate) 
						? calcReservationTotalPrice(startDate, endDate, (Number(trip.pricePerDay)))
						: "0"
					}
				</p>
			</div>

			<Button onClick={handleSubmit(onSubmit)}>Reservar</Button>
		</form> 
	)
}