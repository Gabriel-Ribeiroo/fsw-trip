'use client'

import { useRouter } from 'next/navigation'

import RegisterCard from '@/components/Register'
import * as Dialog from '@/components/ui/Dialog'

export default function Register() {
	const router = useRouter()
	
	return (
		<Dialog.Root open={true} onOpenChange={() => router.back()}>
			<Dialog.Content className="w-full max-w-sm px-2 sm:px-0">
				<RegisterCard />
			</Dialog.Content>
		</Dialog.Root>
	)
}