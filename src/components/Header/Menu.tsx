'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

import { signIn, signOut, useSession } from 'next-auth/react'

import { AiOutlineMenu } from 'react-icons/ai'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { twMerge } from 'tailwind-merge'

export default function Menu() {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const { status, data } = useSession()
	
	const handleMenuClick = () => setIsOpen(prevState => !prevState)
	
	const handleSignInClick = () => signIn()
	const handleSignOutClick = () => signOut()

	const handleCloseDropdown = (event: MouseEvent) => {
		if (dropdownRef.current !== event.target) 
			setIsOpen(false)
	}

	useEffect(() => {
		if (isOpen) 
			document.addEventListener('click', handleCloseDropdown) 
		
		return () => document.removeEventListener('click', handleCloseDropdown)
	}, [isOpen])
	
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
					className="rounded-full select-none" 
				/>
			)}

			{['unauthenticated', 'loading'].includes(status) && (
				<HiOutlineUserCircle size={30} className="rounded-full" />
			)}

			<nav 
				ref={dropdownRef}
				onClick={(event) => event.stopPropagation()}
				className={twMerge(
					`absolute top-12 -left-32 shadow rounded-md w-48
					text-sm font-semibold transition-all duration-75
					shadow-zinc-400 p-1.5 text-primary bg-white z-50`,
					isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
				)}
			>
				<ul className="flex flex-col">
					<li>
						<button 
							onClick={status === 'authenticated' ? handleSignOutClick : handleSignInClick}
							className="w-full text-start p-1 hover:bg-gray-200 border-radius rounded"
						>
							{status === 'authenticated' && 'Logout'}
							{status === 'unauthenticated' && 'Login'}
						</button>
					</li>

					{status === 'authenticated' && (
						<li>
							<Link href="/my-trips" className="w-full block p-1 border-radius rounded hover:bg-gray-200">
								Minhas viagens
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</div>
	)
}