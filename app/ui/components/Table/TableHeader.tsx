import { useContext } from 'react';
import { TableContext } from './context/TableContext';
import { TableHeaderProps } from './interface/ITableProps';

const TableHeader = <T = any>({
	columns,
	rows,
	enableAction = false,
	isSelectableLines = false,
	actions,
}: TableHeaderProps<T>) => {
	const { rowsSelect, selectAll, unSelectAll } = useContext(TableContext);

	return (
		<thead className="bg-gray-50 sticky top-[-4px] z-30">
			<tr>
				{isSelectableLines && (
					<th className="w-1.5">
						<input
							type="checkbox"
							onChange={(event) => {
								event.currentTarget.checked ? selectAll(rows) : unSelectAll();
							}}
							className="h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 mx-4"
							checked={rowsSelect.length === rows.length}
						/>
					</th>
				)}

				{actions && actions.length !== 0 && (
					<th className="py-3.5 px-4 text-start text-sm font-semibold text-gray-500 sm:pl-6 w-fit whitespace-nowrap">
						#
					</th>
				)}

				{columns.map((column, key) => (
					<th
						key={key}
						className="py-3.5 px-4 text-start text-sm font-semibold text-gray-500 sm:pl-6 w-fit whitespace-nowrap"
					>
						{column.label ?? String(column.column)}
					</th>
				))}
				{enableAction && (
					<th
						scope="col"
						className="py-3.5 px-4 text-left text-sm font-semibold text-gray-500 sm:pl-6 "
					></th>
				)}
			</tr>
		</thead>
	);
};

export default TableHeader;
