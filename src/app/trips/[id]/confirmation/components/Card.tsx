import Image from 'next/image'

import { Trip } from '@prisma/client'
import ReactCountryFlag from 'react-country-flag'

interface Props {
	trip: Trip
	totalPrice: number
}

export default function Card({ trip, totalPrice }: Props) {
	return (
		<div className="border p-3.5 border-primary-lighter rounded-lg shadow-lg">
			<div className="flex items-center gap-3 pb-6 border-b border-gray-400">
				<div className="relative h-[6.563rem] w-[7.813rem]">
					<Image src={trip.coverImage} alt={trip.name} fill className="object-cover rounded-lg" />
				</div>

				<div className="flex flex-col gap-1.5">
					<h2 className="font-semibold text-xl text-primary-darker">{trip.name}</h2>

					<div className="flex gap-1.5">
						<ReactCountryFlag countryCode={trip.countryCode} svg />
						<p className="text-xs underline text-gray-400">{trip.location}</p>
					</div>
				</div>
			</div>

			<h3 className="font-semibold text-lg text-primary-darker mt-3">Informações sobre o preço</h3>

			<div className="flex justify-between">
				<p className="font-medium text-primary-darker">Total: </p>
				<p className="font-medium text-primary-darker">R$ {totalPrice}</p>
			</div>
		</div>
	)
}