'use client';
import { ComponentProps, ReactNode, forwardRef } from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { cn } from '@/app/utils/cn';

type TextAreaProps = ComponentProps<'textarea'> & {
	name: string;
	label: string;
	icon?: ReactNode;
	error?: string;
	containerClassName?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	(
		{
			placeholder,
			name,
			label,
			id,
			error,
			className,
			containerClassName,
			icon,
			...props
		},
		ref,
	) => {
		const textAreaId = id ?? name;

		return (
			<div className={cn('w-full', containerClassName)}>
				<label htmlFor={name} className="text-gray-900 font-medium text-sm  ">
					{label}
				</label>

				<div className="mt-1 relative">
					<textarea
						{...props}
						ref={ref}
						name={name}
						autoComplete="off"
						id={textAreaId}
						placeholder={placeholder}
						className={cn(
							`block w-full rounded-md border-0 px-3 py-1.5
							text-gray-900 outline-none focus:ring-2 focus:ring-indigo-600/70 
							transition-all ring-1 ring-inset ring-gray-300 
							placeholder:text-gray-400 sm:text-sm sm:leading-6 resize-none
							      dark:text-white
							`,
							error && 'ring-red-500 focus:ring-red-600    ',
							className,
						)}
					/>

					{icon && (
						<div className="absolute top-1/2 right-2 -translate-y-1/2">
							{icon}
						</div>
					)}
				</div>

				{error && (
					<div className="flex gap-2 items-center mt-2 text-red-500">
						<XCircleIcon className="w-4 h-4" />
						<span className="text-sm">{error}</span>
					</div>
				)}
			</div>
		);
	},
);

TextArea.displayName = 'TextArea';
