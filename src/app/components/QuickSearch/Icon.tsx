import Image from 'next/image'

interface Props  {
	icon: string 
	name: string 
}

export default function Icon({ icon, name }: Props) {
	return (
		<div className="flex flex-col gap-1 items-center">
			<Image 
				width={35} 
				height={35} 
				src={icon} 
				alt={name} 
				className="cursor-pointer"
			/>

			<p>{name}</p>
		</div>
	)
}