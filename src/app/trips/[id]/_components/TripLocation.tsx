import Image from 'next/image'

import Button from '@/components/Button'

interface Props {
	location: string
	locationDescription: string   
}

export default function TripLocation({ location, locationDescription }: Props) {
	return (
		<section className="flex flex-col gap-1 mb-5">
			<h2 className="font-semibold text-primary-darker text-xl px-3">Localização</h2>
			
			<div className="relative h-[16.875rem] w-full">
				<Image src="/map-mobile.png" alt={location} fill className="object-cover" />
			</div>

			<h3 className="text-primary-darker font-semibold px-3">{location}</h3>

			<p className="mb-3 text-primary-darker px-3">{locationDescription}</p>

			<Button>Ver no maps</Button>
		</section>
	)
}