import Icon from './Icon'

export default function QuickSearch() {
	return (
		<section className="flex flex-col gap-4 mt-7">
			<div className="flex items-center gap-2">
				<div className="h-[0.063rem] bg-gray-400 flex-1"></div>
				<h2 className="text-dark font-medium whitespace-nowrap">Tente pesquisar por</h2>
				<div className="h-[0.063rem] bg-gray-400 flex-1"></div>
			</div>

			<div className="grid grid-cols-4">
				<Icon name="Hotel" icon="/hotel-icon.png" />
				<Icon name="Fazenda" icon="/farm-icon.png" />
				<Icon name="Chalé" icon="/cottage-icon.png" />
				<Icon name="Pousada" icon="/inn-icon.png" />
			</div>
		</section>
	)
}