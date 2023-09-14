import { type NextRequest, NextResponse } from 'next/server'

import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma'
import type { RegistrationError } from '@/types/register'
import schema, { type FormProps as RequestProps, type SchemaValidationError } from '@/schemas/register'

export async function POST(request: NextRequest) {
	const body = await request.json() as RequestProps
	const { email, password, username: name } = body
	
	const schemaValidation = schema.safeParse(body)
	
	if (!schemaValidation.success) {
		const error = schemaValidation.error.formErrors
		
		const errors: RegistrationError[] = []

		for (let prop in error.fieldErrors) {
			const _prop = prop as keyof SchemaValidationError
			
			errors.push({ field: _prop, message: error.fieldErrors[_prop]?.[0]! })
		}

		return NextResponse.json({ error: true, errors })
	}

	const userAlreadyExists = await prisma.user.findUnique({
		where: {
			email
		}
	})
	
	if (userAlreadyExists)
		return NextResponse.json({ error: true, errors: [{ field: 'email', message: 'Email já está em uso' }] })

	const hashedPassword = await bcrypt.hash(password, 10)

	const user = await prisma.user.create({
		data: {
			email, 
			name, 
			hashedPassword
		}
	})

	return NextResponse.json({ error: false, user })
}