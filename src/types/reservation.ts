import { Trip } from '@prisma/client'

export interface FieldError {
	field: 'startDate' | 'endDate' | 'guests'
	message: string 
}


export interface ReservationSuccess {
	error: false 
	totalPaid: number 
	trip: Trip
}

export interface ReservationError {
	error: true 
	isAlert: boolean 
	message?: string 
	errors?: FieldError[] 
}

export type ReservationResponse = ReservationError | ReservationSuccess