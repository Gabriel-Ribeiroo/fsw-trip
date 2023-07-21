'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import Button from '@/components/Button'

import { useSession } from 'next-auth/react'
import { format } from 'date-fns'
import { Trip } from '@prisma/client'
import ReactCountryFlag from 'react-country-flag'
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

	const { status } = useSession()

	const searchParams = useSearchParams()

	const startDate = new Date(searchParams.get('startDate') as string)
	const endDate = new Date(searchParams.get('endDate') as string) 

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
			
			setTrip(response.trip)
			setTotalPrice(response.totalPrice)
		} 

		getTrip()
	}, [])

	if(!trip) return null 
	
	return (
		<main className="flex flex-col gap-2 container mx-auto p-2 flex-1">
			<h1 className="font-semibold text-xl font-primary-darker">Sua viagem</h1>

			<div className="border p-3.5 border-primary-lighter rounded-lg shadow-lg">
				<div className="flex items-center gap-3 pb-6 border-b border-gray-400">
					<div className="relative h-[6.563rem] w-[7.813rem]">
						<Image src={trip.coverImage} alt={trip.name} fill className="object-cover rounded-lg" />
					</div>

					<div className="flex flex-col gap-1.5">
						<h2 className="font-semibold text-xl text-primary-darker">{trip.name}</h2>

						<div className="flex gap-1.5">
							<ReactCountryFlag countryCode={trip.countryCode} svg />
							<p className="text-xs underline text-gray-400">{trip.location}</p>
						</div>
					</div>
				</div>

				<h3 className="font-semibold text-lg text-primary-darker mt-3">Informações sobre o preço</h3>

				<div className="flex justify-between">
					<p className="font-medium text-primary-darker">Total: </p>
					<p className="font-medium text-primary-darker">R$ {totalPrice}</p>
				</div>
			</div>

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
						<p>{searchParams.get('guests')} hóspedes</p>
				</div>
			</div>

			<Button>Finalizar Compra</Button>
		</main>
	)
}