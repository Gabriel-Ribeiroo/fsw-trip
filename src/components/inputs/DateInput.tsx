'use client'

import { forwardRef, Ref } from 'react'

import DatePicker, { registerLocale, ReactDatePickerProps } from 'react-datepicker'
import { twMerge } from 'tailwind-merge'
import ptBR from 'date-fns/locale/pt-BR'

import 'react-datepicker/dist/react-datepicker.css'

interface Props extends ReactDatePickerProps {
	hasError?: boolean 
}

registerLocale('pt-BR', ptBR)

function DateInput({ hasError = false, className, ...rest }: Props, ref: Ref<DatePicker>) {
	const inputClassName = twMerge(
		'w-full rounded-lg border border-gray-400 p-2 text-sm focus:outline-none transition duration-200',
		hasError ? 'border-red-500' : 'focus:ring focus:ring-primary',
		className
	)
	
	return (
		<DatePicker 
			locale="pt-BR" 
			dateFormat="dd/MM/yyyy"
			ref={ref}
			enableTabLoop={false}
			className={inputClassName} 
			{...rest}
		/>
	) 
}

export default forwardRef(DateInput)