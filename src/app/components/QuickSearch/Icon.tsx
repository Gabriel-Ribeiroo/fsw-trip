import Image from 'next/image'
import Link from 'next/link'

interface Props  {
	icon: string 
	name: string 
}

export default function Icon({ icon, name }: Props) {
	return (
		<Link href={`/trips/search?location=${name}`} className="flex flex-col gap-1 items-center">
			<Image 
				width={35} 
				height={35} 
				src={icon} 
				alt={name} 
				className="cursor-pointer"
			/>

			<p>{name}</p>
		</Link>
	)
}