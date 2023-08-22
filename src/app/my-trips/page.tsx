import Link from 'next/link'
import { redirect } from 'next/navigation'

import UserReservationItem from './_components/UserReservationItem'
import Button from '@/components/Button'

import { prisma } from '@/scripts/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

async function getUserReservations(id: string) {	
	const reservations = await prisma.tripReservation.findMany({
		where: {
			userId: id
		},
		include: {
			trip: true 
		}
	})

	if (reservations.length > 0)
		return reservations

	return []
}

export default async function MyTrips() {
	const session = await getServerSession(authOptions)
	
	if (!session)
		redirect('/')

	const reservations = await getUserReservations((session.user as any)?.id)
	
	return (
		<main className="flex flex-col gap-3.5 flex-1 p-4">
			<h1 className="font-semibold text-xl">Minhas viagens</h1>			

			{reservations.length === 0 && (
				<div className="flex flex-col gap-3.5 items-center justify-center flex-1">
					<p className="text-primary-darker font-medium text-xl text-center">
						Você ainda não tem nenhuma viagem! )=
					</p>

					<Button asChild className="text-center w-full max-w-xs">
						<Link href="/">Reservar</Link>
					</Button>
				</div>
			)}

			{reservations.map(reservation => (
				<UserReservationItem reservation={reservation} />
			))}		
		</main>
	)
}