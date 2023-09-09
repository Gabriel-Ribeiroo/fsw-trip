import Skeleton from '@/components/ui/Skeleton'
import Button from '@/components/Button'

export default function Loading() {
	return (
		<main className="flex flex-col gap-2 p-2 flex-1 w-full max-w-2xl mx-auto">
			<h1 className="font-semibold text-xl font-primary-darker mt-2.5">Sua viagem</h1>
			
			<div className="border p-3.5 border-primary-lighter rounded-lg shadow-lg">
				<div className="flex items-center gap-3 pb-6 border-b border-gray-400">
					<div className="relative h-[6.563rem] w-[7.813rem]">
						<Skeleton className="h-[6.563rem] w-[7.813rem]" />
					</div>

					<div className="flex flex-col flex-1 gap-1.5">
						<Skeleton className="w-full max-w-[13.75rem] h-4" />

						<div className="flex items-center gap-2">
							<Skeleton className="w-4 h-4 rounded-none" />
							<Skeleton className="w-full max-w-[7rem] h-4" />
						</div>
					</div>
				</div>

				<h3 className="font-semibold text-lg text-primary-darker mt-3">Informações sobre o preço</h3>

				<div className="flex justify-between">
					<p className="font-medium text-primary-darker">Total: </p>
					<Skeleton className="w-24 h-4" />
				</div>
			</div>

			<div className="flex flex-col gap-5 text-primary-darker">
				<div>
					<h3 className="font-semibold text-lg mt-2">Data</h3>
					<Skeleton className="w-full h-4 max-w-[16rem]"/>
				</div>
				
				<div>
					<h3 className="font-semibold text-lg">Hóspedes</h3>
					<Skeleton className="w-full h-4 max-w-[10rem]"/>
				</div>
			</div>

			<Button>Finalizar Compra</Button>
		</main>		
	)
}