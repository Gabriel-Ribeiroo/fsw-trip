'use client'

import Image from 'next/image'
import Link from 'next/link'

import { signOut, useSession } from 'next-auth/react'

import * as Dropdown from '@/components/ui/DropdownMenu'
import { AiOutlineMenu } from 'react-icons/ai'
import { HiOutlineUserCircle } from 'react-icons/hi'

export default function Menu() {
	const { status, data } = useSession()

	return (
		<Dropdown.Root>
			<Dropdown.Trigger>
				<div
					className="flex gap-3 items-center relative p-1.5 border-2 border-gray-500 rounded-3xl"
				>
					<AiOutlineMenu size={18} />

					{status === 'authenticated' && (
						<Image 
							src={data!.user!.image!} 
							alt={data!.user!.name!} 
							width={30} 
							height={30} 
							className="rounded-full select-none" 
						/>
					)}

					{['unauthenticated', 'loading'].includes(status) && (
						<HiOutlineUserCircle size={30} className="rounded-full" />
					)}
				</div>
			</Dropdown.Trigger>

			{status !== 'loading' && (
				<Dropdown.Content>
					<Dropdown.Item>
						{status === 'authenticated' && (
							<button onClick={() => signOut()} className="flex-1 text-start">Logout</button>
						)}
					
						{status === 'unauthenticated' && (
							<Link href="/login" className="flex-1">Login</Link>
						)}
					</Dropdown.Item>

				{status === 'authenticated' && (
					<Dropdown.Item>
						<Link href="my-trips">Minhas viagens</Link>
					</Dropdown.Item>
				)}
			</Dropdown.Content>
			)}
		</Dropdown.Root>			
	)
}