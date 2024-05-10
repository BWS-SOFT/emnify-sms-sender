import { ReactNode } from 'react'
import * as RdxContextMenu from '@radix-ui/react-context-menu'
import { cn } from '@shared/utils/cn'

type ComponentsCommonProps = {
	children: ReactNode
}

const Root = RdxContextMenu.Root

function Trigger({ children }: ComponentsCommonProps) {
	return (
		<RdxContextMenu.Trigger className='w-full' asChild>
			{children}
		</RdxContextMenu.Trigger>
	)
}

type ContentProps = {
	className?: string
	children: ReactNode
}

function Content({ className, children }: ContentProps) {
	return (
		<RdxContextMenu.Content
			data-state='open'
			className={cn(
				`data-[state=open] flex flex-col border min-w-[8rem] w-fit bg-white rounded-md 
					overflow-hidden py-1
					shadow-md
				`,
				className
			)}>
			{children}
		</RdxContextMenu.Content>
	)
}

type ItemProps = React.ComponentPropsWithoutRef<
	typeof RdxContextMenu.Item
> & {
	className?: string
	children: ReactNode
}

function Item({ className, children, ...rest }: ItemProps) {
	return (
		<RdxContextMenu.Item
			className={cn(
				'flex py-2 px-4 text-sm gap-3 items-center text-gray-700 hover:bg-gray-200/60 hover:text-gray-900       cursor-pointer',
				className
			)}
			{...rest}>
			{children}
		</RdxContextMenu.Item>
	)
}

type SeparatorProps = {
	className?: string
}

export function Separator({ className }: SeparatorProps) {
	return (
		<RdxContextMenu.Separator
			className={cn(
				'-mx-1 my-1 h-px bg-gray-200',
				className
			)}
		/>
	)
}

export const ContextMenu = {
	Root,
	Trigger,
	Content,
	Item,
	Separator,
}
