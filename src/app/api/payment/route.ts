import { NextRequest, NextResponse } from 'next/server'

import stripe from '@/lib/stripe'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(request: NextRequest) {
	const { 
		tripId,
		startDate, 
		endDate, 
		guest, 
		totalPaid, 
		coverImage, 
		name, 
		description, 
	} = await request.json()

	const userSession = await getServerSession(authOptions)
	
	const session = await stripe.checkout.sessions.create({
		success_url: 'http://localhost:3000',
		metadata: {
			tripId,
			guest, 
			startDate, 
			endDate,
			userId: (userSession?.user as any)?.id,
			totalPaid
		},
		line_items: [
			{
				price_data: {
					currency: 'brl',
					unit_amount: totalPaid * 100,
					product_data: {
						name, 
						description, 
						images: [coverImage]
					}
				},
				quantity: 1
			}
		],
		mode: 'payment'
	})

	return NextResponse.json({ sessionId: session.id })
}