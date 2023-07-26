import { z } from 'zod'

export default function createDynamicSchema(maxGuests: number) {
	const schema = z
		.object({
			startDate: z.date({ required_error: 'Campo obrigatório.', invalid_type_error: 'Informe uma data válida.' }),

			endDate: z.date({ required_error: 'Campo obrigatório.', invalid_type_error: 'Informe uma data válida.' }),

			guests: z.number({ invalid_type_error: 'Campo obrigatório.' })
				.min(1, { message: 'É necessário ao menos um hóspede.' })
				.max(maxGuests, { message: `Limite de convidados excedido.` })
		})
		.refine(data => data.startDate < data.endDate, { 
			message: 'Data inicial maior do que final.', path: ['startDate']  
		})

	return schema 
}

export interface Form {
	startDate: Date
	endDate: Date 
	guests: number 
}