export function maskCurrencyOnChange(input: string) {
	let formattedInput = input
		.replace(/\D/g, '')
		.replace(/^0/, '')
		.replace(/R\$(?=)/, '')
		.replace(/(\d+)(\d{2})$/, '$1,$2')
		.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

	if (formattedInput.match(/\d/))
		formattedInput = `R$ ${formattedInput}`

	return formattedInput
}

export function maskCurrencyOnBlur(input: string) {
	const [, value]  = input.split(/\s+/)

	if (value?.length === 1 || value?.length === 2) 
		return `${input},00`

	return input 
}
