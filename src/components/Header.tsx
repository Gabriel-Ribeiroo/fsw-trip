import Image from 'next/image'
import Link from 'next/link'

import Menu from '@/components/Menu'

export default function Header() {
	return (
		<header className="flex justify-between items-center px-4 gap-2 h-20 border-b border-gray-400">
			<Link href="/">
				<div className="relative w-8 h-8">
					<Image src="/logo.svg" alt="FSW Trip Logo" className="cursor-pointer" fill />
				</div>
			</Link>

		 	<Menu />
		</header>
	)
}