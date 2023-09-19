import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

function generateQueryParams
(location: string | undefined, initialDate: string | undefined, budget: string | undefined) {	
	const normalizedLocation = location && location.replace(/ /g, '&')
	
	const queryParams: any = {
		AND: [], 
		OR:  []
	}

	if (location) {
		queryParams.OR.push(
			{ name: { search: normalizedLocation } },
			{ description: { search: normalizedLocation } },
			{ location: { search: normalizedLocation } }
		)	
	}
	
	if (initialDate) {
		queryParams.AND.push({ startDate: { gte: new Date(initialDate) } })
	}
	
	if (budget) {
		queryParams.AND.push({ pricePerDay: { lte: Number(budget) } })
	}
	
	return queryParams
} 

export async function POST(request: NextRequest) {
	const { location, initialDate, budget } = await request.json()
	
	const trip = await prisma.trip.findMany({
		where: generateQueryParams(location, initialDate, budget)
	})

	return NextResponse.json(trip)
}