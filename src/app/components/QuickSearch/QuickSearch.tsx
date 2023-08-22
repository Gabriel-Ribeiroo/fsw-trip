import Icon from './Icon'

export default function QuickSearch() {
	return (
		<section className="flex flex-col gap-4 mt-2">
			<div className="flex items-center gap-4 px-3">
				<div className="h-[0.063rem] bg-gray-300 flex-1" />
				<h2 className="text-gray-300 font-medium">Tente pesquisar por</h2>
				<div className="h-[0.063rem] bg-gray-300 flex-1" />
			</div>

			<div className="grid grid-cols-4 py-4 w-full max-w-[92.5rem] mx-auto">
				<Icon name="Hotel" icon="/hotel.svg" />
				<Icon name="Fazenda" icon="/farm.svg" />
				<Icon name="Chalé" icon="/cottage.svg" />
				<Icon name="Pousada" icon="/inn.svg" />
			</div>
		</section>
	)
}