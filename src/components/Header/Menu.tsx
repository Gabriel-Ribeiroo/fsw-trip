'use client'

import Image from 'next/image'

import { signOut, useSession } from 'next-auth/react'

import { AiOutlineMenu } from 'react-icons/ai'

interface Props {
	isMenuOpen: boolean 
	handleMenuClick: () => void 
}

export default function Menu({ isMenuOpen, handleMenuClick }: Props) {
	const { data } = useSession()

	const handleSignOutClick = () => signOut()
	
	return (
		<div
			onClick={handleMenuClick}
			className="flex gap-3 items-center relative p-1.5 border border-gray-400 rounded-3xl cursor-pointer"
		>
			<AiOutlineMenu size={18} />

			<Image 
				src={data!.user!.image!} 
				alt={data!.user!.name!} 
				width={30} 
				height={30} 
				className="rounded-full" 
			/>

			{isMenuOpen && (
				<button 
					onClick={handleSignOutClick}
					className="absolute top-12 left-0 shadow p-1 rounded-full
					w-full text-sm font-semibold text-primary bg-white shadow-zinc-400"
				>
					Logout
				</button>
			)}
		</div>
	)
}