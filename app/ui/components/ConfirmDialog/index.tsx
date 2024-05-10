'use client';
import { ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader } from '../@composition/Dialog';
import { Button } from '../Button';

export type ConfirmDialogProps = {
	onConfirm: () => void;
	onCancel: () => void;
	onClose: () => void;
	open: boolean;
	confirmationText: string;
	title?: string;
	children?: ReactNode;
	isLoading?: boolean;
	id?: string;
};

export function ConfirmDialog({
	onCancel,
	onClose,
	onConfirm,
	open,
	id,
	confirmationText,
	title = 'Confirmar deleção',
	children,
	isLoading = false,
}: ConfirmDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent
				position="center"
				className="h-fit w-80% md:max-w-[30vw] min-w-[25vw] 2xl:max-w-[25vw] 2xl:min-w-[20vw] space-y-4 p-6"
			>
				<DialogHeader className="pb-0 border-b-0 h-fit">
					{title && <span className="text-lg font-medium">{title}</span>}
				</DialogHeader>

				<div className="flex flex-col gap-4" id={id}>
					<div className="items-start">
						{children ?? (
							<h3 className="text-base text-gray-500">{confirmationText}</h3>
						)}
					</div>

					<div className="flex justify-end w-full gap-2 pt-2">
						<Button
							onClick={onCancel}
							className="h-8 gap-2 px-4 text-sm text-gray-700 bg-transparent border border-gray-300 rounded-md w-fit enabled:hover:bg-gray-200"
							disabled={isLoading}
						>
							Cancelar
						</Button>
						<Button
							isLoading={isLoading}
							disabled={isLoading}
							onClick={onConfirm}
							className="h-8 px-6 text-sm w-fit"
						>
							Confirmar
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
