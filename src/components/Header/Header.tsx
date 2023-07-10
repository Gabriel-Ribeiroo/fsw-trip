'use client'

import Image from 'next/image'
import { useState } from 'react'

import Menu from './Menu'

import { signIn, useSession } from 'next-auth/react'

export default function Header() {
	const { status } = useSession()

	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const handleSignInClick = () => signIn()

	const handleMenuClick = () => setIsMenuOpen(prevState => !prevState)
	
	return (
		<header className="flex justify-between items-center px-4 gap-2 h-20 container mx-auto">
			<div className="relative w-[11.563rem] h-[2.188rem]">
				<Image src="/logo.png" alt="FSW Trip Logo" className="cursor-pointer" fill />
			</div>

			{status === 'unauthenticated' && (
				<button 
					onClick={handleSignInClick}
					className="text-primary text-sm font-semibold"
				>
					Login
				</button>
			)}

			{status === 'authenticated' && <Menu isMenuOpen={isMenuOpen} handleMenuClick={handleMenuClick} />}
		</header>
	)
}