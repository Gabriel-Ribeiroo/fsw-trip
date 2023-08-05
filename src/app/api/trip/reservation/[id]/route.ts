import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/scripts/prisma'

interface Props {
	params: {
		id: string 
	}
}

export async function DELETE(req: NextRequest, { params: { id } }: Props) {
	const reservation = await prisma.tripReservation.delete({
		where: {
			id 
		}
	})

	return NextResponse.json(reservation)
}