'use client';
import { TableCellsIcon } from '@heroicons/react/24/solid';
import { cn } from '@/app/utils/cn';

import { ContextMenu } from '../@composition/ContextMenu';
import { EmptyState } from '../@composition/EmptyState';

import { Spinner } from '../Spinner';

import { TableContextMenu } from './TableContextMenu';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { TableProvider } from './context/TableContext';
import { TableProps } from './interface/ITableProps';

export function Table<T>({
	rows,
	columns,
	isSelectableLines,
	onSelectable,
	onTableRowClick,
	rightClickContent = false,
	keyExtractor,
	classNameRow,
	classNameBody,
	classNameContainer,
	isLoading = false,
	className,
	actions = [],
	classNameEmptyState,
	onOpenChange = () => {},
	...rest
}: TableProps<T>) {
	const props = {
		columns,
		rows,
		isSelectableLines,
	};

	return (
		<TableProvider
			rows={rows}
			onSelectable={onSelectable}
			onTableRowClick={onTableRowClick}
			keyExtractor={keyExtractor}
		>
			<ContextMenu.Root>
				<div
					className={cn(
						'w-full h-full max-h-full overflow-y-auto app-scrollbar border rounded-md bg-white shadow-sm',
						classNameContainer,
					)}
				>
					{isLoading && (
						<div className="w-full h-full grid place-items-center p-4">
							<Spinner className="mx-auto" />
							<EmptyState.Title text="Buscando dados para visualização" />
							<EmptyState.Description text="Aguarde os dados da tabela para aproveitar todas as funcionalidades disponíveis" />
						</div>
					)}

					{rows.length !== 0 && !isLoading && (
						<table
							className={cn(
								'w-full h-full max-h-full overflow-y-auto app-scrollbar font-inter',
								className,
							)}
							{...rest}
						>
							<TableHeader {...props} actions={actions} />
							<TableRow
								{...props}
								classNameRow={classNameRow}
								classNameBody={classNameBody}
								onTableRowClick={onTableRowClick}
								actions={actions}
								onOpenChange={onOpenChange}
							/>
						</table>
					)}

					{rows.length === 0 && !isLoading && (
						<div className={cn('w-full h-full', classNameEmptyState)}>
							<EmptyState.Root>
								<>
									<EmptyState.Icon icon={TableCellsIcon} />
									<EmptyState.Title text="Não existem dados para visualização" />
									<EmptyState.Description text="Adicione dados para preencher esta tabela e aproveitar todas as funcionalidades disponíveis" />
								</>
							</EmptyState.Root>
						</div>
					)}
				</div>

				{rightClickContent}

				<TableContextMenu rows={rows} actions={actions} />
			</ContextMenu.Root>
		</TableProvider>
	);
}
