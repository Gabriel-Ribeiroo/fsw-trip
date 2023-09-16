import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

interface Props {
	params: {
		id: string 
	}
}

export async function DELETE(req: NextRequest, { params: { id } }: Props) {
	try {
		const reservation = await prisma.tripReservation.delete({
			where: {
				id
			}
		})

		return NextResponse.json({ error: false, reservation })
	} 
	
	catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return NextResponse.json({ 
				error: true, 
				message: `Aconteceu um erro ao tentar cancelar a reserva. Por favor, tente novamente.` 
			})
		}
	}
}