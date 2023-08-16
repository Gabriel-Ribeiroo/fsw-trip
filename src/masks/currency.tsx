export function removeAlphaCharacters(value: string)  {
	return value.replace(/\D/g, '')
}

export function normalizeValue(value: string) {
	return (parseFloat(value) / 100).toFixed(2)
}

export function formatValue(value: string) {
	return new Intl.NumberFormat('pt-br', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2
	}).format(parseFloat(value))
}