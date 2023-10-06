'use client'

import Button from '@/components/Button'

interface Props {
	location: string 
	locationDescription: string 
	children: React.ReactNode
}

export default function TripLocation({ location, locationDescription, children }: Props) {
	const handleRedirectToMap = () => {
		window.open(`https://www.google.com/maps/place/${location}`, '_blank')
	}
	
	return (
		<section className="flex flex-col gap-1 mb-5">
			<h2 className="font-semibold text-primary-darker text-xl px-3">Localização</h2>
	
			{children}

			<h3 className="text-primary-darker font-semibold px-3">{location}</h3>

			<p className="mb-3 text-primary-darker px-3">{locationDescription}</p>

			<Button onClick={handleRedirectToMap} className="mx-3">Ver no maps</Button>
		</section>
	)
}