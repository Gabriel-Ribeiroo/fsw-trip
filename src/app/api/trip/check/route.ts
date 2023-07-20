import { NextResponse } from 'next/server'

import { prisma } from '@/scripts/prisma'
import { Trip } from '@prisma/client'
import { isBefore, isAfter } from 'date-fns'

interface RequestProps {
	trip: Trip 
	startDate: Date 
	endDate: Date
}

export async function POST(request: Request) {
	const { trip, endDate, startDate } = await request.json() as RequestProps

	if (isBefore(new Date(startDate), new Date(trip.startDate))) 
		return NextResponse.json({ error: { code: 'INVALID_START_DATE' } })

	if (isAfter(new Date(endDate), new Date(trip.endDate)))
		return NextResponse.json({ error: { code: 'INVALID_END_DATE' } })

	const reservations = await prisma.tripReservation.findMany({
		where: {
			tripId: trip.id,
			startDate: {
				lte: new Date(endDate)
			},
			endDate: {
				gte: new Date(startDate)
			}
		} 
	})

	if (reservations.length > 0)
		return NextResponse.json({ error: { code: 'TRIP_ALREADY_RESERVED' } })

	return NextResponse.json({ success: true })
}