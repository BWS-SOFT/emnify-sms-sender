import { ChevronRightIcon } from '@heroicons/react/24/outline';
import * as RdxContextMenu from '@radix-ui/react-context-menu';
import { cn } from '@/app/utils/cn';
import { useContext } from 'react';
import { TableContext } from './context/TableContext';

import { ITableAction, TableContextMenuProps } from './interface/ITableProps';

export function TableContextMenu<T = any>({
	rows,
	actions = [],
}: TableContextMenuProps<T>) {
	const { rowsSelect } = useContext(TableContext);

	const rowsIndexes = rowsSelect as number[];
	const data = rowsIndexes.map((rowIndex) => rows[rowIndex]);

	if (actions.length === 0) {
		return null;
	}

	function TableContextMenuItem({ action }: { action: ITableAction<T> }) {
		if (
			(action.shouldHideOnMultiple && rowsIndexes.length > 1) ||
			(action.shouldHide && action.shouldHide(data, 'context'))
		) {
			return null;
		}

		if (action.element) return action.element;

		if (action.subActions && action.subActions.length !== 0) {
			return (
				<RdxContextMenu.Sub>
					<RdxContextMenu.SubTrigger
						disabled={action.disabled}
						className="flex cursor-pointer border-b last:border-b-0 min-w-[8rem] justify-between rounded-[3px] focus:bg-accent data-[state=open]:bg-indigo-100 data-[state=open]:text-indigo-800 items-center gap-x-3 p-1.5 px-3 pr-1 text-sm outline-none select-none data-[disabled]:text-gray-600 data-[disabled]:pointer-events-none"
					>
						{action.label}
						<ChevronRightIcon className="h-3 w-3" />
					</RdxContextMenu.SubTrigger>
					<RdxContextMenu.Portal>
						<RdxContextMenu.SubContent
							className={cn(
								'flex flex-col z-50 gap-1 w-fit border border-gray-200 bg-white rounded-md overflow-hidden p-1.5 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]',
								'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
							)}
						>
							{action.subActions.map((subAction) => (
								<TableContextMenuItem key={subAction.key} action={subAction} />
							))}
						</RdxContextMenu.SubContent>
					</RdxContextMenu.Portal>
				</RdxContextMenu.Sub>
			);
		}

		return (
			<RdxContextMenu.Item
				key={action.key}
				onClick={() => {
					if (action.onClick) {
						action.onClick(
							rowsIndexes.map((rowIndex) => rows[rowIndex]),
							+action.key,
						);
					}
				}}
				disabled={action.disabled}
				className={cn(
					'group text-sm min-w-[15rem] leading-none text-gray-900 rounded-[3px] flex items-center h-8 px-3 relative select-none outline-none data-[disabled]:text-gray-600 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-100 data-[highlighted]:text-indigo-800 cursor-pointer gap-x-3 border-b border-b-gray-200 last:border-b-0',
				)}
			>
				{action.label}
			</RdxContextMenu.Item>
		);
	}

	return (
		<RdxContextMenu.Portal>
			<RdxContextMenu.Content
				className={cn(
					'flex flex-col gap-1 z-50 border border-gray-200 w-fit bg-white rounded-md overflow-hidden p-1.5 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]',
					'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				)}
			>
				{rowsSelect.length > 1 && (
					<div className="rounded-md bg-indigo-100 text-indigo-400 text-xs p-1 flex items-center justify-center">
						{rowsSelect.length} selecionado(s)
					</div>
				)}

				{actions.map((action) => (
					<TableContextMenuItem key={action.key} action={action} />
				))}
			</RdxContextMenu.Content>
		</RdxContextMenu.Portal>
	);
}
