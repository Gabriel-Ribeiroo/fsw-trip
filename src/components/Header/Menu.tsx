'use client'

import Image from 'next/image'
import Link from 'next/link'

import { signOut, useSession } from 'next-auth/react'

import * as Dropdown from '@/components/ui/DropdownMenu'
import { LogIn, LogOut, UserCircle2, Plane, Menu as MenuIcon } from 'lucide-react'

export default function Menu() {
	const { status, data } = useSession()
	
	return (
		<Dropdown.Root>
			<Dropdown.Trigger>
				<div
					className="flex gap-3 items-center relative p-1.5 border-2 border-gray-500 rounded-3xl"
				>
					<MenuIcon className="opacity-70" />

					{data?.user.image && (
						<Image 
							src={data.user.image} 
							alt={data.user.name} 
							width={30} 
							height={30} 
							className="rounded-full select-none" 
						/>
					)}

					{!data?.user.image && (
						<UserCircle2 size={30} className="opacity-70" />
					)}
				</div>
			</Dropdown.Trigger>

			{status !== 'loading' && (
				<Dropdown.Content className="w-52 right-2 relative">
					<Dropdown.Label className="truncate">
						{status === 'authenticated' && `Ola, ${data.user.name.split(' ')[0]}!`}
						{['loading', 'unauthenticated'].includes(status) && 'Olá, Visitante!'}
					</Dropdown.Label>

					<Dropdown.Separator />

					<Dropdown.Item className="font-medium">
						{status === 'authenticated' && (
							<button 
								onClick={() => signOut()} 
								className="flex items-center gap-1.5 flex-1 text-start"
							>
								<LogOut size={16} />
								<span className="flex-1">Log out</span>
							</button>
						)}
					
						{status === 'unauthenticated' && (
							<Link href="/login" className="flex-1 flex gap-1.5">
								<LogIn size={16} />
								<span className="flex-1">Log in</span>
							</Link>
						)}
					</Dropdown.Item>

				{status === 'authenticated' && (
					<Dropdown.Item className="font-medium">
						<Link href="my-trips" className="flex flex-1 gap-1.5 items-center">
							<Plane size={16} />
							<span className="flex-1">Minhas viagens</span>
						</Link>
					</Dropdown.Item>
				)}
			</Dropdown.Content>
			)}
		</Dropdown.Root>			
	)
}