import { differenceInDays } from 'date-fns'

export function calcReservationTotalPrice(startDate: Date, endDate: Date, pricePerDay: number){
	const _differenceInDays = differenceInDays(endDate, startDate)

	if (!_differenceInDays) return pricePerDay 

	return _differenceInDays * pricePerDay 
}