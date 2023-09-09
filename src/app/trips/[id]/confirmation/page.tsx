import Card from './_components/Card'
import CheckoutButton from './_components/CheckoutButton'

import { format } from 'date-fns'
import { redirect } from 'next/navigation'
import ptBR from 'date-fns/locale/pt-BR'

interface Props {
	params: {
		id: string 
	}
	searchParams: {
		startDate: string 
		endDate: string 
		guests: string 
	}
}

async function getTrip(tripId: string, guest: string, startDate: string, endDate: string) {
	const request = await fetch('http://localhost:3000/api/trip/check', {
		method: 'POST', 
		body: JSON.stringify({
			tripId, 
			guest: Number(guest),
			startDate: new Date(startDate), 
			endDate: new Date(endDate) 
		})
	}) 

	return await request.json()
}

export default async function TripConfirmation({ 
	params: { id }, 
	searchParams: { startDate, endDate, guests } 
}: Props) {
	const response = await getTrip(id, guests, startDate, endDate)

	if (response.error) 
		redirect('/')
	
	const trip = response.trip
	const totalPaid = response.totalPaid

	return (
		<main className="flex flex-col gap-2 p-2 flex-1 w-full max-w-2xl mx-auto">
			<h1 className="font-semibold text-xl font-primary-darker mt-2.5">Sua viagem</h1>
			<Card trip={trip} totalPrice={totalPaid} />

			<div className="flex flex-col gap-5 text-primary-darker">
				<div>
					<h3 className="font-semibold text-lg mt-2">Data</h3>
					
					<div className="flex gap-1.5">
						<p>{format(new Date(startDate), "dd 'de' MMMM", { locale: ptBR })}</p>
						<span>-</span>
						<p>{format(new Date(endDate), "dd 'de' MMMM", { locale: ptBR })}</p>
					</div>
				</div>
				
				<div>
					<h3 className="font-semibold text-lg">Hóspedes</h3>
					<p>{guests} hóspedes</p>
				</div>
			</div>

			<CheckoutButton 
				trip={trip} 
				startDate={startDate} 
				endDate={endDate} 
				guest={guests}
				totalPaid={totalPaid}
			/>
		</main>
	)
}