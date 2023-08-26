import TripReservation from './_components/TripReservation'
import TripDescription from './_components/TripDescription'
import TripHighlights from './_components/TripHighlights'
import TripLocation from './_components/TripLocation'
import TripHeader from './_components/TripHeader'

import { prisma } from '@/lib/prisma'

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
		<main className="w-full max-w-7xl mx-auto flex flex-col gap-4">
			<TripHeader trip={trip} />

			<div className="flex flex-col gap-8 lg:mt-10">
				<div className="flex flex-col px-3 lg:items-start gap-4 lg:flex-row lg:gap-16">
					<TripReservation trip={trip} />

					<div className="flex flex-col gap-4 lg:order-1">
						<TripDescription description={trip.description} />
						<TripHighlights highlights={trip.highlights} />
					</div>
				</div>

				<TripLocation location={trip.location} />
			</div>
		</main>
	)
}
