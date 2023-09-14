import z from 'zod'

const schema = z.object({
	username: z.string()
		.nonempty({ message: 'Campo obrigatório' })
		.max(50, { message: 'Nome deve conter no máximo 50 caracteres. ' }),

	email: z.string()
		.nonempty({ message: 'Campo obrigatório' })
		.email({ message: 'E-mail inválido.' }),

	password: z.string()
		.nonempty({ message: 'Campo obrigatório' })
		.min(6, { message: 'Senha deve conter no mínimo 6 caracteres' })
		.max(31, { message: 'Senha deve conter no máximo 35 caracteres' })
		.regex(/\d/g, { message: "Senha deve conter no mínimo 1 número" })
		.regex(/[a-z]/g, { message: 'Senha deve conter ao mínimo 1 caracter minúsculo' })
		.regex(/[A-Z]/g, { message: 'Senha deve conter ao mínimo 1 caracter maiúsculo' })
})

export interface SchemaValidationError {
	username?: string[]
	email?: string[] 
	password?: string[]  
}

export type FormProps = z.infer<typeof schema>

export default schema 