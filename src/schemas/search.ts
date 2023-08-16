import { z } from 'zod'

const schema = z.object({
	location: z.string()
		.min(1, { message: 'Campo obrigatório.' }),

	initialDate: z.date({ invalid_type_error: '' })	
		.min(new Date(new Date().setHours(0, 0, 0, 0)), { message: 'Data inválida' })	
		.optional(),
	
	budget: z.string()	
		.optional()
}) 

export type Form = z.infer<typeof schema>

export default schema 