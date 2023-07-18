import Image from 'next/image'

import TripReservation from './components/TripReservation'
import TripDescription from './components/TripDescription'

import { prisma } from '@/scripts/prisma'
import ReactCountryFlag from 'react-country-flag'

interface Props {
	params: {
		id: string 
	}
}

async function getTrip(tripId: string) {
	return await prisma.trip.findUnique({
		where: {
			id: tripId
		}		
	})
}

export default async function TripDetails({ params: { id } }: Props) {
	const trip = await getTrip(id)

	if (!trip) return null 

	return (
		<main className="container mx-auto flex flex-col gap-4">
				<div className="relative w-full h-[18.75rem]">
					<Image src={trip.coverImage} alt={trip.name} fill className="object-cover " />
				</div>

				<div className="flex flex-col gap-4 px-3">
					<div className="flex flex-col gap-1">
						<h1 className="font-semibold text-xl text-primary-darker">{trip.name}</h1>

						<div className="flex items-center gap-1">
							<ReactCountryFlag countryCode={trip.countryCode} svg />
							<p className="text-xs underline text-dark">{trip.location}</p>
						</div>

						<p className="text-xs text-dark">
							<span className="text-primary mr-1 font-medium">R$ {trip.pricePerDay.toString()}</span>
							por dia
						</p>
					</div>

					<TripReservation trip={trip} />
					<TripDescription description={trip.description} />
				</div>
		</main>
	)
}
