import TripSearch from './components/TripSearch'
import QuickSearch from './components/QuickSearch/QuickSearch'
import RecommendedTrips from './components/RecommendedTrips'

export default function Home() {
	return (
		<>
			<main className="container mx-auto p-4 bg-search-area bg-cover">
				<h1 className="text-center text-xl font-bold mb-3.5">
					Encontre a sua próxima <span className="text-primary">viagem!</span>
				</h1>

				<TripSearch />
				<QuickSearch />
				<RecommendedTrips />
			</main>
		</>
	)
}