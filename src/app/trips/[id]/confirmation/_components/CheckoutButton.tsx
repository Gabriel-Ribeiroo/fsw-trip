'use client'

import { useRouter } from 'next/navigation'

import Button from '@/components/Button'

import { Trip } from '@prisma/client'
import { loadStripe } from '@stripe/stripe-js'
import { useSession } from 'next-auth/react'

interface Props {
	trip: Trip
	startDate: string 
	endDate: string 
	guest: string 
	totalPaid: string  
}

export default function CheckoutButton({ trip, startDate, endDate, guest, totalPaid }: Props) {
	const { status } = useSession()

	const router = useRouter() 

	const handleBuyClick = async () => {		
		if (status !== 'authenticated')
			return router.push('/login')

		const request = await fetch('http://localhost:3000/api/payment', {
			method: 'POST',
			body: JSON.stringify({
				tripId: trip.id,  
				name: trip.name,
				coverImage: trip.coverImage,
				description: trip.description,
				startDate: new Date(startDate), 
				endDate: new Date(endDate),
				totalPaid: Number(totalPaid),
				guest: Number(guest),
			})
		})

		const sessionId = await request.json()

		const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!)

		await stripe?.redirectToCheckout({ sessionId })
	}
	
	return (
		<Button 
			className="mt-1" 
			onClick={handleBuyClick}
		>
			Finalizar Compra
		</Button>
	)
}