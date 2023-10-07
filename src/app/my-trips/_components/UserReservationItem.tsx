'use client'

import Image from 'next/image'
import { useState } from 'react'

import Country from '@/components/Country'
import Button from '@/components/Button'
import * as AlertDialog from '@/components/ui/AlertDialog'

import { Loader2 } from 'lucide-react'
import { Prisma } from '@prisma/client'
import { format } from 'date-fns'
import { useToast } from '@/components/ui/use-toast'
import ptBR from 'date-fns/locale/pt-BR'

interface Props {
	reservation: Prisma.TripReservationGetPayload<{
		include: { trip: true }
	}>
}

export default function UserReservationItem({ reservation }: Props) {
	const { trip } = reservation

	const { toast } = useToast() 

	const [isLoading, setIsLoading] = useState(false)

	const handleDeleteClick = async () => {
		setIsLoading(true)

		const request = await fetch(`/api/trip/reservation/${reservation.id}`, {
			method: 'DELETE'
		})

		const response = await request.json() 

		if (response.error) {
			toast({
				title: "Ooopss...",
				variant: "destructive",
				description: response.message,
			})
		}

		else {
			toast({
				title: 'Sucesso',
				description: "A reserva foi cancelada!"
			})
		}

		setTimeout(() => {
			window.location.reload() 
		}, 2500)
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

			<AlertDialog.Root>
				<AlertDialog.Trigger asChild>
					<Button variant="destructiveOutline">Cancelar Viagem</Button>
				</AlertDialog.Trigger>

				<AlertDialog.Content>
					<AlertDialog.Header>
						<AlertDialog.Title className="text-primary-darker">Você tem certeza?</AlertDialog.Title>
						<AlertDialog.Description>
							Se você cancelar e depois tentar reservar novamente nessa mesma data, pode ser que você não consiga. 
						</AlertDialog.Description>
					</AlertDialog.Header>

					<AlertDialog.Footer className="sm:space-x-0 gap-2">
						<AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>

						<Button 
							onClick={handleDeleteClick} 
							variant="default"
						>
							{isLoading ? 'Cancelando' : 'Confirmar'}
							{isLoading && <Loader2 className="animate-spin" />}
						</Button>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</div>
	</div>
	)
}