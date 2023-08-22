import { NextRequest, NextResponse } from 'next/server'

import stripe from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
	const signature = request.headers.get('stripe-signature')

	const text = await request.text() 

	const event = stripe.webhooks.constructEvent(text, signature!, process.env.STRIPE_WEBHOOK_SECRET_KEY!)

	if (event.type === 'checkout.session.completed') {
		const session = event.data.object as any

		await prisma.tripReservation.create({
			data: {
				startDate: new Date(session.metadata.startDate),
				endDate: new Date(session.metadata.endDate),
				userId: session.metadata.userId,
				tripId: session.metadata.tripId, 
				totalPaid: Number(session.metadata.totalPaid),
				guest: Number(session.metadata.guest)
			}
		})
	}

	return NextResponse.json({ received: true })
}