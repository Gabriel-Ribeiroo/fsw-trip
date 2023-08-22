import TripSearch from './_components/TripSearch'
import QuickSearch from './_components/QuickSearch/QuickSearch'
import RecommendedTrips from './_components/RecommendedTrips'

export default function Home() {
	return (
		<>
			<main>
				<div 
					className="px-4 flex flex-col justify-center gap-2 h-64 
					bg-search-area md:gap-5 md:h-80"
				>
					<h1 
						className="text-center text-primary-darker text-xl font-semibold mb-3.5 md:text-4xl"
					>
						Encontre a sua próxima <span className="text-primary">viagem!</span>
					</h1>

					<TripSearch />
				</div>
				
				<QuickSearch />
				<RecommendedTrips />
			</main>
		</>
	)
}