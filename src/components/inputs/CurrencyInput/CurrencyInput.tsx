'use client'

import { useState, InputHTMLAttributes, ChangeEvent, FocusEvent } from 'react'

import { twMerge } from 'tailwind-merge'

import { maskCurrencyOnBlur, maskCurrencyOnChange } from './mask' 

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	hasError?: boolean
}

export default function CurrencyInput({ hasError = false, className, ...rest }: Props) {
	const [inputData, setInputData] = useState('') 

	const inputClassName = twMerge(
		'rounded-lg w-0 p-2 transition duration-200 text-sm border border-gray-400 outline-none',
		hasError ? 'border-red-500' : 'focus:ring-1 focus:ring-primary',
		className
	)

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const formattedInput = maskCurrencyOnChange(event.target.value)

		setInputData(formattedInput)
	}

	const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
		const formattedInput = maskCurrencyOnBlur(event.target.value)

		setInputData(formattedInput)
	}
	
	return (
		<input 
			type="text"
			value={inputData} 
			className={inputClassName}
			onChange={handleInputChange}
			onBlur={handleInputBlur}
			{...rest}
		/>
	)
}