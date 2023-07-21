import { NextResponse } from 'next/server'

import { prisma } from '@/scripts/prisma'
import { isBefore, isAfter } from 'date-fns'
import { calcReservationTotalPrice } from '@/utils/reservation'

interface RequestProps {
	tripId: string  
	startDate: string 
	endDate: string
}

export async function POST(request: Request) {
	const { tripId, endDate, startDate } = await request.json() as RequestProps

	const convertedStartDate = new Date(startDate)
	const convertedEndDate = new Date(endDate)

	 const trip = await prisma.trip.findUnique({
		where: {
			id: tripId
		}
	 })

	 if (!trip)
	 	return NextResponse.json({ error: { code: 'TRIP_NOT_FOUND' } })

	if (isBefore(convertedStartDate, new Date(trip.startDate))) 
		return NextResponse.json({ error: { code: 'INVALID_START_DATE' } })

	if (isAfter(convertedEndDate, new Date(trip.endDate)))
		return NextResponse.json({ error: { code: 'INVALID_END_DATE' } })

	const reservations = await prisma.tripReservation.findMany({
		where: {
			tripId: trip.id,
			startDate: {
				lte: convertedEndDate
			},
			endDate: {
				gte: convertedStartDate
			}
		} 
	})

	if (reservations.length > 0)
		return NextResponse.json({ error: { code: 'TRIP_ALREADY_RESERVED' } })

	return NextResponse.json({
		success: true,
		trip,
		totalPrice: calcReservationTotalPrice(
			convertedStartDate, convertedStartDate, (trip.pricePerDay as unknown as number)
		)
	})
}