import Image from 'next/image'

export default function Footer() {
	return (
		<footer className="flex flex-col gap-2 items-center p-4 bg-gray-100">
			<Image src="/logo.png" alt="FSW Trip Logo" width={135} height={25} />
			<p className="text-sm font-medium text-primary-darker">Todos os direitos reservados</p>
		</footer>
	)
}