import { ReactNode, ElementType } from 'react'
import { cn } from '@shared/utils/cn'

import { Button, ButtonProps } from 'view/components/Button'

function EmptyStateRoot({
	children,
	className,
}: {
	children: ReactNode
	className?: string
}) {
	return (
		<div
			className={cn(
				'flex items-center justify-center text-center h-full w-full',
				className
			)}>
			<div>{children}</div>
		</div>
	)
}

interface EmptyStateProps {
	icon: ElementType
}

function EmptyStateIcon({ icon: Icon }: EmptyStateProps) {
	return (
		<Icon className='mx-auto h-12 w-12 text-gray-400  ' />
	)
}

function EmptyStateTitle({ text }: { text: string }) {
	return (
		<h3 className='mt-2 text-sm font-semibold text-gray-900  '>
			{text}
		</h3>
	)
}

function EmptyStateDescription({ text }: { text: string }) {
	return (
		<p className='mt-1 text-sm text-gray-500  '>
			{text}
		</p>
	)
}

type EmptyStateButtonProps = ButtonProps & {
	text: string
}

function EmptyStateButton({
	text,
	...rest
}: EmptyStateButtonProps) {
	return (
		<div className='mt-6 inline-flex justify-center'>
			<Button {...rest}>{text}</Button>
		</div>
	)
}

export const EmptyState = {
	Root: EmptyStateRoot,
	Title: EmptyStateTitle,
	Description: EmptyStateDescription,
	Icon: EmptyStateIcon,
	Button: EmptyStateButton,
}
