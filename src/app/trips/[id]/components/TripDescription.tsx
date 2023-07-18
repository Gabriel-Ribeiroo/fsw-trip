interface Props {
	description: string 
}

export default function TripDescription({ description }: Props) {
	return (
		<div className="flex flex-col gap-1">
			<h2 className="font-semibold text-primary-darker text-xl">Sobre a viagem</h2>
			<p>{description}</p>
		</div>
	)
}