import TripItem from '@/components/TripItem'

import { Trip } from '@prisma/client'

interface Props {
	searchParams: {
		location?: string 
		initialDate?: Date
		budget?: string 
	}
}

export default async function Trips({ searchParams: { location, initialDate, budget } }: Props) {	
	const request = await fetch('http://localhost:3000/api/trip/search', {
		method: 'POST',
		body: JSON.stringify({
			location,
			initialDate,
			budget
		})
	})
	
	const trips: Trip[] = await request.json() 

	return (
		<main className="flex-1 flex flex-col items-center gap-5 mb-4">
			<div className="flex flex-col gap-1 items-center">
				<h1 className="text-xl text-primary-darker font-semibold">
					Hospedagens encontradas
				</h1>

				{trips.length > 0 && <p className="text-dark">Listamos os melhores locais para você!</p>}
				
				{!trips.length && <p className="text-dark">Poxa, não encontramos nada por aqui =(</p>}
			</div>
			
			{trips.map(trip => (
				<TripItem key={trip.id} trip={trip} />
			))}
		</main>
	)
}