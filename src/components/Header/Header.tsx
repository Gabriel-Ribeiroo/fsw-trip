import Image from 'next/image'
import Link from 'next/link'

import Menu from './Menu'

export default function Header() {
	return (
		<header className="flex justify-between items-center px-4 gap-2 h-20 container mx-auto">
			<Link href="/">
				<div className="relative w-8 h-8">
					<Image src="/logo.png" alt="FSW Trip Logo" className="cursor-pointer" fill />
				</div>
			</Link>

		 <Menu />
		</header>
	)
}