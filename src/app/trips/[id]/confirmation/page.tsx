'use client'

import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import Button from '@/components/Button'
import Card from './components/Card'

import { useSession } from 'next-auth/react'
import { format } from 'date-fns'
import { Trip } from '@prisma/client'
import { toast } from 'react-toastify'
import ptBR from 'date-fns/locale/pt-BR'

interface Props {
	params: {
		id: string 
	}
}

export default function TripConfirmation({ params: { id } }: Props) {
	const [trip, setTrip] = useState<Trip | null>(null)
	const [totalPrice, setTotalPrice] = useState<number>(0)

	const router = useRouter()

	const { status, data } = useSession()

	const searchParams = useSearchParams()

	const startDate = new Date(searchParams.get('startDate') as string)
	const endDate = new Date(searchParams.get('endDate') as string) 
	const guest = parseInt(searchParams.get('guests') as string)

	const handleBuyClick = async () => {
		const request = await fetch('http://localhost:3000/api/trip/reservation', {
			method: 'POST',
			body: JSON.stringify({
				userId: (data?.user as any).id,
				totalPaid: totalPrice,
				tripId: id, 
				startDate, 
				endDate,
				guest
			})
		})

		if (!request.ok)
			return toast.error('Ocorreu um erro ao realizar a reserva!', { position: 'bottom-center' })

		router.push('/')
		toast.success('Reserva realizada com sucesso!', { position: 'bottom-center' })
	}

	useEffect(() => {
		if (status === 'unauthenticated')
			router.push('/')
	}, [status])

	useEffect(() => {
		const getTrip = async () => {
			const request = await fetch('http://localhost:3000/api/trip/check', {
				method: 'POST',
				body: JSON.stringify({
					tripId: id,
					startDate,
					endDate
				})
			})

			const response = await request.json()

			if (response.error) {
				router.push('/')
				toast.error(`${response.error}`)
			}
			
			setTrip(response.trip)
			setTotalPrice(response.totalPrice)
		} 

		getTrip()
	}, [])

	if(!trip) return null 
	
	return (
		<main className="flex flex-col gap-2 container mx-auto p-2 flex-1">
			<h1 className="font-semibold text-xl font-primary-darker">Sua viagem</h1>

			<Card trip={trip} totalPrice={totalPrice} />

			<div className="flex flex-col gap-5 text-primary-darker">
				<div>
					<h3 className="font-semibold text-lg mt-2">Data</h3>
					
					<div className="flex">
						<p>{format(startDate, "dd 'de' MMMM", { locale: ptBR })} -</p>
						<p>{format(endDate, "dd 'de' MMMM", { locale: ptBR })}</p>
					</div>
				</div>
				
				<div>
					<h3 className="font-semibold text-lg">Hóspedes</h3>
					<p>{guest} hóspedes</p>
				</div>
			</div>

			<Button onClick={handleBuyClick}>Finalizar Compra</Button>
		</main>
	)
}