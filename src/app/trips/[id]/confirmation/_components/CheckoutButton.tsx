'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Button from '@/components/Button'

import { Trip } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import { useSession } from 'next-auth/react'

interface Props {
	trip: Trip
	startDate: string 
	endDate: string 
	guests: string 
	totalPaid: string  
}

export default function CheckoutButton({ trip, startDate, endDate, guests, totalPaid }: Props) {
	const { status } = useSession()

	const [isLoading, setIsLoading] = useState(false)

	const router = useRouter() 

	const handleBuyClick = async () => {		
		if (status !== 'authenticated')
			return router.push('/login')

		setIsLoading(true)

		const request = await fetch('/api/payment', {
			method: 'POST',
			body: JSON.stringify({
				tripId: trip.id,  
				name: trip.name,
				coverImage: trip.coverImage,
				description: trip.description,
				startDate: new Date(startDate), 
				endDate: new Date(endDate),
				totalPaid: Number(totalPaid),
				guests: Number(guests),
			})
		})

		const sessionId = await request.json()

		const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!)

		await stripe?.redirectToCheckout(sessionId)
	}
	
	return (
		<Button 
			className="mt-1" 
			onClick={handleBuyClick}
		>
			{isLoading ? 'Finalizando a compra' : 'Finalizar compra'}
			{isLoading && <Loader2 size={16} className="animate-spin" />}
		</Button>
	)
}