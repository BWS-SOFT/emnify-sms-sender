import { Listbox } from '@headlessui/react'
import { ComponentProps } from 'react'

type SelectSeeOptionsButtonProps =
	ComponentProps<'button'> & {
		show?: boolean
		label?: string
	}

export function SelectSeeOptionsButton({
	show,
	label = 'Ver apenas selecionados',
	...props
}: SelectSeeOptionsButtonProps) {
	if (!show) return null

	return (
		<Listbox.Button className='absolute top-0 right-1'>
			<span
				className='w-fit font-medium transition-all ease-in-out duration-300 h-6 bg-transparent hover:bg-transparent text-indigo-500 hover:text-indigo-700 text-xs p-0'
				{...props}>
				{label}
			</span>
		</Listbox.Button>
	)
}
