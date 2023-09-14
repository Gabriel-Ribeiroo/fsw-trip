import z from 'zod'

const schema = z.object({
	email: z.string()
		.nonempty({ message: 'Campo obrigatório' })
		.email({ message: 'Email inválido' }),

	password: z.string()
		.nonempty({ message: 'Campo obrigatório' })
})

export type SchemaProps = z.infer<typeof schema>

export default schema