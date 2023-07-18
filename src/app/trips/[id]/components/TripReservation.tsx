'use client'

import Button from '@/components/Button'
import DateInput from '@/components/inputs/DateInput'
import TextInput from '@/components/inputs/TextInput'

import { Trip } from '@prisma/client'

interface Props {
	trip: Trip
}

export default function TripReservation({ trip }: Props) {
	return (
		<form className="flex flex-col gap-2 pb-10 border-b border-gray-400">
			<div className="grid grid-cols-2 gap-2">
				<DateInput placeholderText="Data Inicial" onChange={() => {}} />
				<DateInput placeholderText="Data Final" onChange={() => {}} />
			</div>

			<TextInput placeholder={`Número de Hóspedes (max: ${trip.maxGuests})`} type="number" />

			<div className="flex justify-between">
				<p className="font-medium text-sm text-primary-darker">Total: </p>
				<p className="font-medium text-sm text-primary-darker">R$ 2500 </p>
			</div>

			<Button>Reservar</Button>
		</form>
	)
}