import _ from 'lodash';
import React, { useContext } from 'react';
import { useKeyPress } from 'reactflow';

import { cn } from '@/app/utils/cn';

import { ContextMenu } from '../@composition/ContextMenu';
import { TableDropdownMenu } from './TableDropdownMenu';
import { TableContext } from './context/TableContext';
import { TableRowProps } from './interface/ITableProps';

const TableRow = <T = any,>({
	columns,
	rows,
	isSelectableLines,
	onTableRowClick,
	classNameRow,
	classNameBody,
	actions,
	onOpenChange = () => {},
}: TableRowProps<T>) => {
	const pressed = useKeyPress('Control');

	const { rowsSelect, selectRow, unSelectRow, unSelectAll } =
		useContext(TableContext);

	const parentRef = React.useRef(null);

	return (
		<ContextMenu.Trigger>
			<tbody
				ref={parentRef}
				className={cn('w-full h-full overflow-y-auto bg-white', classNameBody)}
			>
				{rows.map((row, index) => (
					<tr
						key={index}
						onClick={() => {
							if (pressed) {
								rowsSelect.find((item) => _.isEqual(row, item))
									? unSelectRow(row)
									: selectRow(row);
							}

							if (onTableRowClick) {
								onTableRowClick(row);
							}
						}}
						onContextMenu={() => {
							if (!rowsSelect.includes(index)) {
								unSelectAll();
								selectRow(index);
							}
						}}
						className={cn(
							'hover:bg-gray-200 border-t border-gray-200 cursor-pointer h-1',
							rowsSelect.includes(row) && 'bg-gray-50',
						)}
					>
						{isSelectableLines && (
							<td className="w-1.5 max-h-10">
								<input
									type="checkbox"
									className="w-4 h-4 mx-4 text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-600"
									checked={rowsSelect.includes(index)}
									onChange={(event) => {
										event.currentTarget.checked
											? selectRow(index)
											: unSelectRow(index);
									}}
								/>
							</td>
						)}

						{actions && actions.length !== 0 && (
							<td className="w-24">
								<TableDropdownMenu
									rowIndex={index}
									onOpenChange={onOpenChange}
									row={row}
									actions={actions}
								/>
							</td>
						)}

						{columns.map(({ column, render }, columnKey) => (
							<td
								className={cn(
									'whitespace-nowrap py-3.5 pl-4 pr-3 text-sm sm:pl-6 max-h-10',
									classNameRow,
								)}
								key={columnKey}
							>
								{render != undefined ? render(row, index) : String(row[column])}
							</td>
						))}
					</tr>
				))}
				{/* NAO TIRAR
				Esse <tr></tr> faz com que o height seja aplicado
				com 1 elemento na tabela */}
				<tr></tr>
			</tbody>
		</ContextMenu.Trigger>
	);
};

export default TableRow;
