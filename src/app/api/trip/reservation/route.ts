import { NextResponse } from 'next/server'

import { prisma } from '@/scripts/prisma'

export async function POST(request: Request) {
	const { startDate, endDate, userId, tripId, totalPaid, guest } = await request.json()

 	await prisma.tripReservation.create({
		data: {
			startDate,
			endDate,
			userId, 
			tripId, 
			totalPaid,
			guest
		}
	})

	return NextResponse.json({ success: true })
}