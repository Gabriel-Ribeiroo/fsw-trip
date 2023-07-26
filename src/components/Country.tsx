import ReactCountryFlag from 'react-country-flag'

interface Props {
	code: string 
	location: string 
}

export default function Country({ code, location }: Props) {
	return (
		<div className="flex items-center gap-2">
			<ReactCountryFlag countryCode={code} svg />
			<p className="text-xs underline text-gray-400">{location}</p>
		</div>
	)
}