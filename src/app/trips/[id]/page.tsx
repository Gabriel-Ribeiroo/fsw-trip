import Image from 'next/image'

import TripReservation from './_components/TripReservation'
import TripDescription from './_components/TripDescription'
import TripHighlights from './_components/TripHighlights'
import TripLocation from './_components/TripLocation'

import { prisma } from '@/lib/prisma'
import Country from '@/components/Country'

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
					<section className="flex flex-col gap-1">
						<h1 className="font-semibold text-xl text-primary-darker">{trip.name}</h1>

						<Country code={trip.countryCode} location={trip.location} />

						<p className="text-xs text-dark">
							<span className="text-primary mr-1 font-medium">R$ {trip.pricePerDay.toString()}</span>
							por dia
						</p>
					</section>

					<TripReservation trip={trip} />
					<TripDescription description={trip.description} />
					<TripHighlights highlights={trip.highlights} />
					<TripLocation location={trip.location} />
				</div>
		</main>
	)
}
