'use client';
import { cn } from '@/app/utils/cn';

import { tv, VariantProps } from 'tailwind-variants';

const dotVariants = tv({
	base: 'h-[6.4px] w-[6.4px] mr-2 rounded-full',
	variants: {
		theme: {
			green: 'bg-green-400  ',
			gray: 'bg-gray-400  ',
			yellow: 'bg-yellow-400  ',
			blue: 'bg-blue-400  ',
			red: 'bg-red-400  ',
			default: 'bg-indigo-400  ',
		},
	},
	defaultVariants: {
		theme: 'gray',
	},
});

const badgeVariants = tv({
	base: `inline-flex items-center font-medium items-center py-0.5 rounded-md text-sm ring-1 ring-inset`,
	variants: {
		variant: {
			rounded: 'rounded-full',
			basic: 'rounded-md',
		},
		theme: {
			default: 'bg-indigo-100 text-indigo-800 ring-indigo-700/30      ',
			green: 'bg-green-100 text-green-800 ring-green-500/30      ',
			gray: 'bg-gray-100 text-gray-800 ring-gray-500/30    ',
			yellow: 'bg-yellow-100 text-yellow-800 ring-yellow-700/30      ',
			red: 'bg-red-100 text-red-800 ring-red-700/30      ',
			blue: 'bg-blue-100 text-blue-800 ring-blue-500/30      ',
		},
		borderless: {
			true: 'ring-0 ring-transparent',
			false: 'ring-1 ring-inset',
		},
		size: {
			sm: 'text-xs px-2',
			base: 'text-sm px-2.5',
			lg: 'text-md px-3.5',
			xl: 'text-xl px-3.5',
		},
	},
	defaultVariants: {
		size: 'base',
		theme: 'gray',
	},
});

type BadgeVariantsProps = typeof badgeVariants;

type BadgeProps = VariantProps<BadgeVariantsProps> & {
	label: string;
	removable?: boolean;
	icon?: React.ReactNode;
	showDot?: boolean;
	className?: string;
	iconAction?: () => void;
	onClick?: () => void;
};

export function Badge({
	label,
	removable,
	icon,
	className,
	iconAction,
	theme,
	variant,
	borderless = false,
	showDot = false,
	size,
	onClick,
}: BadgeProps) {
	return (
		<div
			onClick={onClick}
			className={cn(
				badgeVariants({
					className,
					size,
					theme,
					variant,
					borderless,
				}),
			)}
		>
			{showDot && <div className={cn(dotVariants({ theme }))} />}

			<span className="flex flex-1 whitespace-nowrap">{label}</span>

			{icon && icon}

			{removable && (
				<button
					onClick={iconAction}
					className={cn(
						'flex group relative items-center rounded-sm hover:opacity-50 ml-1',
					)}
				>
					<svg viewBox="0 0 14 14" className={'h-3.5 w-3.5 stroke-current'}>
						<path d="M4 4l6 6m0-6l-6 6" />
					</svg>
				</button>
			)}
		</div>
	);
}
