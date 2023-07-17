import TripItem from '@/components/TripItem'
import { prisma } from '@/scripts/prisma'

async function getTrips() {
	return await prisma.trip.findMany()
}

export default async function RecommendedTrips() {
	const trips = await getTrips()
	
	return (
		<section className="flex flex-col gap-5 mt-7">
			<div className="flex items-center gap-2">
				<div className="flex-1 h-[0.063rem] bg-gray-400" />
				<h2 className="font-medium text-dark">Destinos recomendados</h2>
				<div className="flex-1 h-[0.063rem] bg-gray-400" />
			</div>

			<div className="flex flex-col items-center gap-5">
				{trips.map(trip => (
					<TripItem key={trip.id} trip={trip} />
				))}
			</div>

		</section>
	)
}