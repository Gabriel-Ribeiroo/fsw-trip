'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Button from '@/components/Button'
import Country from '@/components/Country'

import { Prisma } from '@prisma/client'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import ptBR from 'date-fns/locale/pt-BR'

interface Props {
	reservation: Prisma.TripReservationGetPayload<{
		include: { trip: true }
	}>
}

export default function UserReservationItem({ reservation }: Props) {
	const { trip } = reservation

	const router = useRouter() 

	const handleDeleteClick = async () => {
		const request = await fetch(`http://localhost:3000/api/trip/reservation/${reservation.id}`, {
			method: 'DELETE'
		})

		if (!request.ok)
			return toast.error('Ocorreu um erro ao cancelar a viagem!', { position: 'bottom-center' })

		toast.success('Reserva cancelada com sucesso!', { position: 'bottom-center' })
		router.refresh()
	}
	
	return (
		<div className="border p-3.5 border-primary-lighter rounded-lg shadow-lg">
			<div className="flex items-center gap-3 pb-6 border-b border-gray-400">
				<div className="relative h-[6.563rem] w-[7.813rem]">
					<Image src={trip.coverImage} alt={trip.name} fill className="object-cover rounded-lg" />
				</div>

				<div className="flex flex-col gap-1.5">
					<h2 className="font-semibold text-xl text-primary-darker">{trip.name}</h2>

					<Country location={trip.location} code={trip.countryCode} />
				</div>
			</div>

			<div className="flex flex-col gap-5 text-primary-darker">
				<div>
					<h3 className="font-semibold text-base mt-2">Data</h3>
					
					<div className="flex gap-1">
						<p>{format(reservation.startDate, "dd 'de' MMMM", { locale: ptBR })} -</p>
						<p> {format(reservation.endDate, "dd 'de' MMMM", { locale: ptBR })}</p>
					</div>
				</div>
				
				<div>
					<h3 className="font-semibold text-base">Hóspedes</h3>
					<p>{reservation.guest} hóspedes</p>
				</div>

				<h3 className="font-semibold text-lg text-primary-darker pt-3 border-t border-gray-400">
					Informações sobre o preço
				</h3>

				<div className="flex justify-between">
					<p className="font-medium text-primary-darker">Total: </p>
					<p className="font-medium text-primary-darker">R$ {Number(reservation.totalPaid)}</p>
				</div>

				<Button variant="destructiveOutline" onClick={handleDeleteClick}>Cancelar</Button>
			</div>
		</div>
	)
}