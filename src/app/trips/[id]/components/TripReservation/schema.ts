import { z } from 'zod'

const schema = z.object({
	startDate: z.date({ required_error: 'Campo obrigatório.', invalid_type_error: 'Informe uma data válida.' }),

	endDate: z.date({ required_error: 'Campo obrigatório.', invalid_type_error: 'Informe uma data válida.' }),

	guests: z.string()
		.min(1, { message: 'Campo obrigatório.' })
		.regex(/\d/g, { message: 'Apenas números são permitidos.' })
})

export type Form = z.infer<typeof schema>

export default schema