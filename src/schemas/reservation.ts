import { z } from 'zod'

export interface Form {
	startDate: Date
	endDate: Date 
	guests: number 
}

export interface SchemaValidationError {
	startDate?: string[]
	endDate?: string[] 
	guests?: string[]
}

export default function createDynamicSchema(
	maxGuests: number, 
	tripStartDate: Date, 
	tripEndDate: Date
) {
	return z
		.object({
			startDate: z.date({ 
				required_error: 'Campo obrigatório.', 
				invalid_type_error: 'Informe uma data válida.' 
			})
				.min(tripStartDate, { message: 'Data inválida.' })
				.max(tripEndDate, { message: 'Data inválida.' }),

			endDate: z.date({ 
				required_error: 'Campo obrigatório.', 
				invalid_type_error: 'Informe uma data válida.' 
			})
				.min(tripStartDate, { message: 'Data inválida.' })
				.max(tripEndDate, { message: 'Data inválida.' }),

			guests: z.number({ 
				invalid_type_error: 'Campo obrigatório.' 
			})
				.min(1, { message: 'É necessário ao menos um hóspede.' })
				.max(maxGuests, { message: `Limite de convidados excedido.` })
		})
		.refine((data) => 
			new Date(data.startDate) <= new Date(data.endDate),
			{ message: 'Data inválida.', path: ['endDate'] }
		)
}