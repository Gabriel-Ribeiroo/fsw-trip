import TripItem from '@/components/TripItem'
import { prisma } from '@/lib/prisma'

async function getTrips() {
	return await prisma.trip.findMany()
}

export default async function RecommendedTrips() {
	const trips = await getTrips()
	
	return (
		<section className="flex flex-col gap-7 mb-3">
			<div className="flex items-center gap-4 px-3">
				<div className="h-[1px] bg-gray-300 flex-1" />
				<h2 className="text-gray-300 font-medium">Destinos recomendados</h2>
				<div className="h-[1px] bg-gray-300 flex-1" />
			</div>

			<div 
				className="grid grid-cols-1 justify-items-center gap-4
				w-full max-w-7xl mx-auto sm:grid-cols-2 min-[850px]:grid-cols-3 min-[1120px]:grid-cols-4"
			>
				{trips.map(trip => (
					<TripItem key={trip.id} trip={trip} />
				))}
			</div>
		</section>
	)
}