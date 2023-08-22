import Image from 'next/image'

import Button from '@/components/Button'

interface Props {
	location: string  
}

export default function TripLocation({ location }: Props) {
	return (
		<section className="flex flex-col gap-1 mb-5">
			<h2 className="font-semibold text-primary-darker text-xl">Localização</h2>
			
			<div className="relative h-[16.875rem] w-full">
				<Image src="/map-mobile.png" alt={location} fill className="object-cover" />
			</div>

			<h3 className="text-primary-darker font-semibold">{location}</h3>

			<p className="mb-3 text-primary-darker">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione aspernatur dolor ipsam commodi pariatur. Quasi vero quis perferendis officia natus, accusantium asperiores esse consequuntur fugit, quas laborum eius aperiam impedit.</p>

			<Button>Ver no maps</Button>
		</section>
	)
}