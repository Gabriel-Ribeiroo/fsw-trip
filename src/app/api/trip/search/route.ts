import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/scripts/prisma'

function generateQueryParams
(location: string | undefined, initialDate: string | undefined, budget: string | undefined) {	
	const normalizedLocation = location && location.replace(/ /g, '&')
	
	let queryParams: any = {
		AND: [], 
		OR:  []
	}

	if (location)
		queryParams = {
			...queryParams, 
			OR: [
				{ name: { search: normalizedLocation } }, 
				{ description: { search: normalizedLocation } }, 
				{ location: { search: normalizedLocation } }
			]
		}

	if (initialDate) {
		queryParams = {
			...queryParams,
			AND: [
				...queryParams.AND,
				{startDate: { gte: new Date(initialDate) } }
			]
		}
	}
	
	if (budget) {
		queryParams = {
			...queryParams, 
			AND: [
				...queryParams.AND,
				{ pricePerDay: { lte: Number(budget) } }
			]
		}
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