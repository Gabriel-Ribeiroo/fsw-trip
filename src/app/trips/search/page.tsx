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
	const request = await fetch(`${process.env.HOST_URL}/api/trip/search`, {
		method: 'POST',
		body: JSON.stringify({
			location,
			initialDate,
			budget
		})
	})
	
	const trips: Trip[] = await request.json() 

	return (
		<main className="flex-1 flex flex-col gap-5 my-4 px-2.5">
			<div>
				<h1 className="text-xl text-primary-darker font-semibold sm:text-4xl text-center">
					Hospedagens encontradas
				</h1>

				<p className="text-dark text-center">
					{trips.length > 0 
						? 'Listamos os melhores locais para você!' 
						: 'Poxa, não encontramos nada por aqui =('
					}
				</p>
			</div>
			
			<div 
				className="grid grid-cols-1 justify-items-center gap-4 w-full mx-auto
				max-w-[92.5rem] sm:grid-cols-2 min-[850px]:grid-cols-3 min-[1120px]:grid-cols-4"
			>
				{trips.map(trip => (
					<TripItem key={trip.id} trip={trip} />
				))}
			</div>
		</main>
	)
}