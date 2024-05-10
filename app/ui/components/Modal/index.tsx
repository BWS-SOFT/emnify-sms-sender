'use client';
import { ReactNode } from 'react';

import { cn } from '@/app/utils/cn';
import {
	Dialog,
	DialogCloseButton,
	DialogContent,
	DialogHeader,
	DialogVariantsProps,
} from '../@composition/Dialog';

type ModalProps = DialogVariantsProps & {
	children: ReactNode;
	className?: string;
	title?: string;
	open: boolean;
	onClose: () => void;
	rightAction?: ReactNode;
	classNameHeader?: string;
	containerClassName?: string;
};

export function Modal({
	open,
	onClose,
	title,
	className,
	children,
	rightAction,
	position,
	classNameHeader,
	containerClassName,
}: ModalProps) {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className={className} position={position}>
				<DialogHeader className={classNameHeader}>
					<DialogCloseButton />

					{title && <span className="text-lg font-medium">{title}</span>}

					{rightAction && (
						<div className="flex items-center justify-end flex-1">
							{rightAction}
						</div>
					)}
				</DialogHeader>

				<div
					className={cn(
						'h-[95%] max-h-[95%] overflow-y-auto',
						containerClassName,
					)}
				>
					{children}
				</div>
			</DialogContent>
		</Dialog>
	);
}
