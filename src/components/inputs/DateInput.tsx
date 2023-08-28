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
		'w-full rounded-md border border-gray-400 p-2 outline-none transition duration-200',
		hasError ? 'border-red-500' : 'focus:ring-1 focus:ring-primary',
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