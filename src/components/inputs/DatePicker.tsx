'use client'

import type { ReactNode } from 'react'

import  Button from '@/components/Button'
import { Calendar } from '@/components/ui/Calendar'
import * as Popover from '@/components/ui/Popover'

import { type DayPickerBase } from 'react-day-picker'
import { Calendar as CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import ptBR from 'date-fns/locale/pt-BR'

interface Props extends DayPickerBase {
	hasError?: boolean 
	placeholder?: ReactNode
	selected: Date | undefined
}

export default function DatePicker({ placeholder, hasError = false, ...rest }: Props) {
	return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
					className={cn(
						`justify-between font-normal transition duration-200 bg-white 
						text-black border border-gray-400`,
						!rest.selected && 'text-gray-400',
          	hasError 
							? 'ring-1 ring-red-500 border-none' 
							: 'data-[state=open]:ring-1 data-[state=open]:ring-primary'
          )}
        >
          {rest.selected ? format(rest.selected, "y'/'MM'/'dd") : <span>{placeholder ?? 'Data'}</span>}
          <CalendarIcon className="hidden h-4 w-4 sm:block" />
        </Button>
      </Popover.Trigger>
      <Popover.Content 
				className="w-auto p-0">
        <Calendar
          mode="single"
					className="bg-white"
          initialFocus
					locale={ptBR}
          {...rest}
        />
      </Popover.Content>
    </Popover.Root>
  )
}

