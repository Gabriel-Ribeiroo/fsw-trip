import Image from 'next/image'

import Country from '@/components/Country'

import { Trip } from '@prisma/client'

interface Props {
	trip: Trip
}

export default function TripImage({ trip }: Props) {
	return (
		<div className="flex flex-col gap-4 md:gap-0">
			<div className="relative w-full h-80 md:hidden">
				<Image src={trip.coverImage} alt={trip.name} fill className="object-cover " />
			</div>

			<div className="hidden px-3 md:grid md:order-2 grid-cols-[2fr,1fr,1fr] gap-2 grid-rows-2">

				<div className="relative row-span-2">
					<Image 
						src={trip.coverImage} 
						alt={trip.name} 
						fill 
						className="object-cover rounded-tl-lg rounded-bl-lg shadow-md"
					/>
				</div>

				<div className="relative h-[12.5rem] w-full">
					<Image
						src={trip.imagesUrl[0]}
						alt={trip.name}
						fill 
						className="shadow-md object-cover"
					/>
				</div>

				<div className="relative h-[12.5rem] w-full">
					<Image
						src={trip.imagesUrl[1]}
						alt={trip.name}
						fill 
						className="shadow-md object-cover"
					/>
				</div>

				<div className="relative h-[12.5rem] w-full">
					<Image
						src={trip.imagesUrl[2]}
						alt={trip.name}
						fill 
						className="shadow-md object-cover"
					/>
				</div>

				<div className="relative h-[12.5rem] w-full">
					<Image
						src={trip.coverImage}
						alt={trip.name}
						fill 
						className="shadow-md object-cover rounded-br-lg"
					/>
				</div>

			</div>

			<section className="flex flex-col gap-1 px-3 md:order-1 md:my-5">
				<h1 className="font-semibold text-xl md:text-3xl text-primary-darker">{trip.name}</h1>

				<Country code={trip.countryCode} location={trip.location} />

				<p className="text-xs text-dark md:hidden">
					<span className="text-primary mr-1 font-medium ">R$ {Number(trip.pricePerDay)}</span>
					por dia
				</p>
			</section>
		</div>
	)
}