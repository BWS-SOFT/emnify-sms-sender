import _ from 'lodash';
import { createContext, useEffect, useState } from 'react';
import {
    ITableContext,
    TableProviderProps,
    baseEntity,
} from '../interface/ITableProps';

export const TableContext = createContext({} as ITableContext<any>);

export const TableProvider = <T extends baseEntity>({
	children,
	onSelectable,
	rows,
	keyExtractor,
}: TableProviderProps<T>) => {
	const [rowsSelect, setRowsSelect] = useState<number[]>([]);
	const [selectedItemsUniqueIdentifiers, setSelecteditemsUniqueIdentifiers] =
		useState<string[]>([]);

	useEffect(() => {
		if (!keyExtractor) return;

		setSelecteditemsUniqueIdentifiers(
			rowsSelect.map((item) => keyExtractor?.(rows[item]) ?? ''),
		);

		onSelectable && onSelectable(findRows());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rowsSelect, keyExtractor]);

	const findRows = () => {
		if (keyExtractor) {
			return selectedItemsUniqueIdentifiers.map((identifier) => {
				return rows.find((item) => keyExtractor?.(item) === identifier) as T;
			});
		}
		return rowsSelect.map((index) => rows[index]);
	};

	const onHandleSelectRow = (indexRow: number) => {
		const rowsSelected = rowsSelect.includes(indexRow);
		!rowsSelected && unSelectAll();
		selectRow(indexRow);
	};

	useEffect(() => {
		if (!keyExtractor) return;

		const updatedSelectedRows = rows
			.filter((item) =>
				_.includes(selectedItemsUniqueIdentifiers, keyExtractor?.(item)),
			)
			.map((item) => rows.findIndex((row) => _.isEqual(row, item)));

		setRowsSelect(updatedSelectedRows);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rows]);

	const selectRow = (rawValueRow: number) => {
		// if ('uuid' in rawValueRow) {
		// 	setRowsSelect((oldState) => {
		// 		return _.uniqBy([...oldState, rawValueRow], 'uuid');
		// 	});
		// 	return;
		// }

		setRowsSelect((oldState) => [...oldState, rawValueRow]);
	};

	const unSelectRow = (rawValueRow: T) => {
		const filterData = rowsSelect.filter((val) => !_.isEqual(rawValueRow, val));
		setRowsSelect([...filterData]);
	};

	const selectAll = () => {
		const indexRows = rows.map((_, index) => index);
		setRowsSelect(indexRows);
	};

	const unSelectAll = () => {
		setRowsSelect([]);
	};

	useEffect(() => {
		onSelectable && onSelectable(findRows());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rowsSelect]);

	return (
		<TableContext.Provider
			value={{
				rowsSelect,
				selectRow,
				unSelectRow,
				selectAll,
				unSelectAll,
				onHandleSelectRow,
				rows,
			}}
		>
			{children}
		</TableContext.Provider>
	);
};
