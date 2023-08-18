'use client'

import { forwardRef, type Ref, type ChangeEvent, type InputHTMLAttributes } from 'react'

import { twMerge } from 'tailwind-merge'
import * as mask from '@/masks/currency'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
	hasError?: boolean  
	value: string | undefined
	onChange: (value: string) => void 
}

function 
CurrencyInput({ onChange, value, className, hasError = false, ...rest }: Props, ref: Ref<HTMLInputElement>) {
	const inputClassName = twMerge(
		'rounded-lg border border-gray-400 p-2 text-sm outline-none transition duration-200',
		hasError ? 'border-red-500' : 'focus:ring-1 focus:ring-primary',
		className,
	)
	
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const valueWithoutAlphaCaracters = mask.removeAlphaCharacters(event.target.value)
		const normalizedValue = mask.normalizeValue(valueWithoutAlphaCaracters)

		onChange(normalizedValue)
	}

	const inputValue = value?.match(/[1-9]/g) ? mask.formatValue(value) : ''

	return (
		<input 
			type="text"
			className={inputClassName}
			onChange={handleInputChange}
			value={inputValue}
			ref={ref}
			{...rest}
		/>
	)
}

export default forwardRef(CurrencyInput)