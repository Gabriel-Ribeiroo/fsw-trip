import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import createDynamicSchema, { SchemaValidationError } from '@/schemas/reservation'
import { calcReservationTotalPrice } from '@/utils/reservation'

interface RequestProps {
	tripId: string  
	startDate: string 
	endDate: string
	guests: number 
}

export async function POST(request: NextRequest) {
	const { tripId, endDate, startDate, guests } = await request.json() as RequestProps

	const convertedStartDate = new Date(startDate)
	const convertedEndDate = new Date(endDate)

	 const trip = await prisma.trip.findUnique({
		where: {
			id: tripId
		}
	 })

	if (!trip) {
		return NextResponse.json({ error: true, isAlert: true, message: 'Viagem não encontrada' })
	}

	const schemaValidation = createDynamicSchema(trip.maxGuests, trip.startDate, trip.endDate)
		.safeParse({ 
			startDate: convertedStartDate, 
			endDate: convertedEndDate, 
			guests: Number(guests) 
		})

	if (!schemaValidation.success) {
		const error = schemaValidation.error.formErrors

		const errors = []

		for (let prop in error.fieldErrors) {
			const _prop = prop as keyof SchemaValidationError

			errors.push({ field: _prop, message: error.fieldErrors[_prop]?.[0] })
		}

		return NextResponse.json({ error: true, isAlert: false, errors })
	}

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
		return NextResponse.json({ error: true, isAlert: true, message: 'Data já reservada' })

	const totalPaid = calcReservationTotalPrice(convertedStartDate, convertedEndDate, (Number(trip.pricePerDay)))

	return NextResponse.json({
		error: false,
		totalPaid,
		trip
	})
}