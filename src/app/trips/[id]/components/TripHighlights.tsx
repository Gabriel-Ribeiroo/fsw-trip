import Image from 'next/image'

import { v4 as uuidv4 } from 'uuid'

interface Props {
	highlights: string[]
}

export default function TripHighlights({ highlights }: Props) {
	return (
		<section className="flex flex-col gap-2">
			<h2 className="font-semibold text-primary-darker text-xl">Destaques</h2>

			<div className="grid grid-cols-1 gap-y-3">
				{highlights.map(highlight => (
					<div className="flex items-center gap-1" key={uuidv4()}>
						<Image src="/check.svg" alt={highlight} width={25} height={25} />
						<p className="text-sm whitespace-nowrap">{highlight}</p>
					</div>
				))}
			</div>
		</section>
	)
}