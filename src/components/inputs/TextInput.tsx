import { InputHTMLAttributes, Ref, forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	hasError?: boolean 
}

function TextInput({ hasError = false, className, ...rest }: Props, ref: Ref<HTMLInputElement>) {
	const inputClassName = twMerge(
		'rounded-lg border border-gray-400 p-2 text-sm focus:outline-none w-0',
		hasError ? 'border-red-500' : 'focus:ring focus:ring-primary',
		className,
	)
	
	return (
		<input 
			type="text" 
			ref={ref}
			className={inputClassName}
			{...rest} 
		/>
	)
}

export default forwardRef(TextInput)