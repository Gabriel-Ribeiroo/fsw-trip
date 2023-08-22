import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { isBefore, isAfter } from 'date-fns'
import { calcReservationTotalPrice } from '@/utils/reservation'

interface RequestProps {
	tripId: string  
	startDate: string 
	endDate: string
	guest: number 
}

export async function POST(request: NextRequest) {
	const { tripId, endDate, startDate, guest } = await request.json() as RequestProps

	const convertedStartDate = new Date(startDate)
	const convertedEndDate = new Date(endDate)

	 const trip = await prisma.trip.findUnique({
		where: {
			id: tripId
		}
	 })

	if (!trip)
	 	return NextResponse.json({ error: { code: 'TRIP_NOT_FOUND' } })

	if (guest > trip.maxGuests)
		return NextResponse.json({ error: { code: 'GUESTS_EXCEED_LIMIT' } })

	if (convertedStartDate > convertedEndDate)
	 return NextResponse.json({ error: { code: 'INVALID_DATES' } })

	if (guest <= 0)
	 	return NextResponse.json({ error: { code: 'GUESTS_LESS_THAN_ONE' } })
 
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
		totalPaid: calcReservationTotalPrice(
			convertedStartDate, convertedEndDate, (trip.pricePerDay as unknown as number)
		)
	})
}