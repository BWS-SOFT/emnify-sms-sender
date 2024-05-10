'use client';
import {
	CheckCircleIcon,
	ExclamationTriangleIcon,
	InformationCircleIcon,
	XCircleIcon,
} from '@heroicons/react/20/solid';
import { cn } from '@/app/utils/cn';
import { ComponentProps } from 'react';
import { VariantProps, tv } from 'tailwind-variants';

const customToastVariants = tv({
	base: 'flex w-full items-center rounded-md shadow',
	variants: {
		hidden: {
			true: 'hidden',
		},
		borderless: {
			true: 'ring-0 ring-transparent',
			false: 'ring-1 ring-inset',
		},
		variant: {
			info: 'bg-blue-50 text-blue-700 ring-blue-300',
			warning: 'bg-yellow-200/35 text-yellow-700 ring-yellow-300',
			error: 'bg-red-50 text-red-700 ring-red-300',
			success: 'bg-green-50 text-green-700 ring-green-300',
		},
		size: {
			sm: 'text-sm gap-3 py-3 px-4',
			base: 'text-md gap-4 p-4',
			xs: 'text-xs gap-3 py-2 px-3',
		},
	},
	defaultVariants: {
		size: 'base',
	},
});

type CustomToastVariantProps = VariantProps<typeof customToastVariants>;

interface Props extends CustomToastVariantProps, ComponentProps<'div'> {
	title: string;
	subtitle?: string;
}

export function CustomToast({
	title,
	subtitle,
	hidden,
	variant = 'info',
	size = 'base',
	className,
	borderless = true,
	children,
}: Props) {
	const iconSize = {
		sm: 'h-5 w-5',
		xs: 'h-4 w-4',
		base: 'h-5 w-5',
	};

	const icon = {
		info: <InformationCircleIcon className={iconSize[size]} />,
		warning: <ExclamationTriangleIcon className={iconSize[size]} />,
		success: <CheckCircleIcon className={iconSize[size]} />,
		error: <XCircleIcon className={iconSize[size]} />,
	};

	return (
		<div
			className={cn(
				customToastVariants({
					className,
					variant,
					hidden,
					size,
					borderless,
				}),
			)}
		>
			<div className="mt-0.5">{icon[variant]}</div>

			<div className="flex flex-col flex-1">
				<span className="font-medium leading-5">{title}</span>
				{subtitle && <p>{subtitle}</p>}
			</div>

			{children}
		</div>
	);
}
