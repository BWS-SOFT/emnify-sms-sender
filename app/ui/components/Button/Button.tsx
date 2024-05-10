'use client';
import { ComponentProps } from 'react';

import { cn } from '@/app/utils/cn';

import { ArrowPathIcon } from '@heroicons/react/24/outline';

import { tv, VariantProps } from 'tailwind-variants';

export const buttonVariants = tv({
	base: `flex items-center justify-center gap-2 rounded-md border border-transparent 
		text-sm font-medium text-white shadow-sm focus-visible:outline 
    focus-visible:outline-2 focus-visible:outline-offset-2 
    focus-visible:outline-indigo-600 transition-colors`,
	variants: {
		variant: {
			default: `bg-indigo-600 enabled:hover:bg-indigo-600/80   
				dark:enabled:hover:bg-indigo-400`,
			soft: `bg-indigo-100 text-indigo-700 enabled:hover:bg-indigo-200 
				    dark:hover:bg-black/10`,
			outline: `border-gray-300 bg-transparent text-gray-700 enabled:hover:bg-gray-200 
				      enabled:dark:hover:bg-gray-800/40`,
		},
		disabled: {
			true: 'bg-gray-300 text-gray-500  ',
		},
		rounded: {
			true: 'rounded-full',
		},
		isLoading: {
			true: 'cursor-wait',
		},
		size: {
			xl: 'h-11 px-2.5 text-lg',
			lg: 'h-10 px-2.5 text-md',
			base: 'h-9 px-2.5',
			sm: 'h-8 px-2 text-sm',
			xs: 'h-7 text-xs px-2',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'base',
	},
});

export type ButtonVariantProps = typeof buttonVariants;

export type ButtonProps = ComponentProps<'button'> &
	VariantProps<ButtonVariantProps> & {
		isLoading?: boolean;
	};

export function Button({
	className,
	isLoading,
	disabled,
	children,
	variant,
	size,
	rounded,
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			disabled={disabled || isLoading}
			className={cn(
				buttonVariants({
					variant,
					size,
					disabled: disabled || isLoading,
					rounded,
					isLoading,
				}),
				className,
			)}
		>
			{isLoading && <ArrowPathIcon className="w-4 h-4 animate-spin" />}
			{children}
		</button>
	);
}
