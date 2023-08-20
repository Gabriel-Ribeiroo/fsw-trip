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
					width={35} 
					height={35} 
					src={icon} 
					alt={name} 
				/>
			</Link>

			<p>{name}</p>
		</div>
	)
}