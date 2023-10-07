import Link from 'next/link'
import { redirect } from 'next/navigation'

import UserReservationItem from './_components/UserReservationItem'
import Button from '@/components/Button'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

async function getUserReservations(id: string) {	
	const reservations = await prisma.tripReservation.findMany({
		where: {
			userId: id
		},
		include: {
			trip: true 
		}
	})

	return reservations
}

export default async function MyTrips() {
	const session = await getServerSession(authOptions)
	
	if (!session)
		redirect('/')

	const reservations = await getUserReservations(session.user.id)
	
	return (
		<main className="flex flex-col gap-4 flex-1 p-4">
			{reservations.length === 0 && (
				<div className="flex flex-col gap-3.5 items-center justify-center flex-1">
					<h1 className="text-primary-darker font-medium text-xl text-center">
						Você ainda não tem nenhuma viagem! )=
					</h1>

					<Button asChild className="text-center w-full max-w-xs">
						<Link href="/">Reservar</Link>
					</Button>
				</div>
			)}

			{reservations.length > 0 && (
				<>
					<h1 
						className="font-semibold text-xl text-center text-primary-darker sm:text-3xl "
					>
						Minhas viagens
					</h1>	

					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl mx-auto">
						{reservations.map(reservation => (
							<UserReservationItem reservation={reservation} key={reservation.id} />
						))}		
					</div>
				</>
			)}
		</main>
	)
}