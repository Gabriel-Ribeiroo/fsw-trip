import { User } from '@prisma/client'

export type RegistrationError = {
	field: 'username' | 'email' | 'password' 
	message: string 
}

export interface RegisterSuccess {
	error: false 
	user: User 
}

export interface RegisterError {
	error: true
	errors: RegistrationError[]
}

export type UserRegistrationResponse = RegisterSuccess | RegisterError 