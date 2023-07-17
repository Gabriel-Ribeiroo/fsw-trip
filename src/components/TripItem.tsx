import Image from 'next/image'

import { Trip } from '@prisma/client'
import ReactCountryFlag from 'react-country-flag'

interface Props {
	trip: Trip
}

export default function TripItem({ trip }: Props) {
	return (
		<div className="flex flex-col gap-1">
			<div className="relative w-[16.25rem] h-[16.25rem]">
				<Image src={trip.coverImage} alt={trip.name} fill className="rounded-lg shadow-md object-cover" />
			</div>

			<h3 className="text-primary-darker font-medium text-sm mt-2">{trip.name}</h3>

			<div className="flex gap-2 items-center"> 
				<ReactCountryFlag countryCode={trip.countryCode} svg />
				<p className="text-xs text-gray-400">{trip.location}</p>
			</div>

			<p className="text-xs text-gray-400">
				<span className="text-primary mr-1">R$ {trip.pricePerDay.toString()}</span>
				por dia
			</p>
		</div>
	)
}