'use client'

import TextInput from '@/components/inputs/TextInput'
import DateInput from '@/components/inputs/DateInput'
import CurrencyInput from '@/components/inputs/CurrencyInput'
import Button from '@/components/Button'

export default function TripSearch() {
	return (
		<form className="flex flex-col gap-4">
			<TextInput placeholder="Onde você quer ir?" className="w-full" />
			
			<div className="grid grid-cols-2 gap-4">
				<DateInput placeholderText="Primeira Data" onChange={() => {}} />	
				<CurrencyInput placeholder="Orçamento" className="w-full" />
			</div>

			<Button>Buscar</Button>
		</form>
	)
}