import Image from 'next/image'

import { Trip } from '@prisma/client'

interface Props {
	trip: Trip
}

export default function TripHighlights({ trip: { highlights, id } }: Props) {
	return (
		<div className="flex flex-col gap-2">
			<h2 className="font-semibold text-primary-darker text-xl">Destaques</h2>

			<div className="grid grid-cols-1 gap-y-3">
				{highlights.map(highlight => (
					<div className="flex items-center gap-1" key={id}>
						<Image src="/check-icon.png" alt={highlight} width={15} height={15} />
						<p className="text-sm whitespace-nowrap">{highlight}</p>
					</div>
				))}
			</div>
		</div>
	)
}