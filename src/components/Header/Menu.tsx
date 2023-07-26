'use client'

import Image from 'next/image'
import { useState } from 'react'

import { signIn, signOut, useSession } from 'next-auth/react'

import { AiOutlineMenu } from 'react-icons/ai'
import { HiOutlineUserCircle } from 'react-icons/hi'

export default function Menu() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const { status, data } = useSession()
	
	const handleMenuClick = () => setIsMenuOpen(prevState => !prevState)

	const handleSignInClick = () => signIn()
	const handleSignOutClick = () => signOut()
	
	return (
		<div
			onClick={handleMenuClick}
			className="flex gap-3 items-center relative p-1.5 border-2 border-gray-500 rounded-3xl cursor-pointer"
		>
			<AiOutlineMenu size={18} />

			{status === 'authenticated' && (
				<Image 
					src={data!.user!.image!} 
					alt={data!.user!.name!} 
					width={30} 
					height={30} 
					className="rounded-full" 
				/>
			)}

			{status === 'unauthenticated' && (
				<HiOutlineUserCircle size={28} className="rounded-full" />
			)}

			{isMenuOpen && (
				<button 
					onClick={status === 'authenticated' ? handleSignOutClick : handleSignInClick}
					className="absolute top-12 left-0 shadow p-1.5 rounded-md z-50
					w-full text-sm font-semibold text-primary bg-white shadow-zinc-400"
				>
					{status === 'authenticated' && 'Logout'}
					{status === 'unauthenticated' && 'Login'}
				</button>
			)}
		</div>
	)
}