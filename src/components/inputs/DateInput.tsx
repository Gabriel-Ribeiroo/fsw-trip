import { InputHTMLAttributes, Ref, forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	hasError?: boolean 
}

function DateInput({ hasError = false, className, ...rest }: Props, ref: Ref<HTMLInputElement>) {
	const inputClassName = twMerge(
		'w-0 rounded-lg border border-gray-400 p-2 text-sm focus:outline-none',
		hasError ? 'border-red-500' : 'focus:ring focus:ring-primary',
		className
	)
	
	return (
		<input type="date" className={inputClassName} {...rest} />
	)
}

export default forwardRef(DateInput)