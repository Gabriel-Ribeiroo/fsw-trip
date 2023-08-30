'use client'

import { useRouter } from 'next/navigation'

import LoginCard from '@/components/Login'
import * as Dialog from '@/components/ui/Dialog'

export default function Login() {
	const router = useRouter()
	
	return (
		<Dialog.Root open={true} onOpenChange={() => router.back()}>
			<Dialog.Content className="w-full max-w-sm px-2 sm:px-0">
				<LoginCard />
			</Dialog.Content>
		</Dialog.Root>
	)
}