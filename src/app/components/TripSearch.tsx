import DateInput from '@/components/inputs/DateInput'
import TextInput from '@/components/inputs/TextInput'

export default function TripSearch() {
	return (
		<form className="flex flex-col gap-4">
			<TextInput placeholder="Onde você quer ir?" className="w-full" />
			
			<div className="w-full flex gap-2 container">
				<DateInput className="flex-1" />
				<TextInput placeholder="Orçamento" className="flex-1" />
			</div>
		</form>
	)
}