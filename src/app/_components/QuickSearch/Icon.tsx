import Image from 'next/image'
import Link from 'next/link'

interface Props  {
	icon: string 
	name: string 
}

export default function Icon({ icon, name }: Props) {
	return (
		<div className="flex flex-col gap-1 items-center">
			<Link href={`/trips/search?location=${name}`}>
				<Image 
					width={40} 
					height={40} 
					src={icon} 
					alt={name} 
				/>
			</Link>

			<p className="text-gray-400 text-sm sm:text-base">{name}</p>
		</div>
	)
}