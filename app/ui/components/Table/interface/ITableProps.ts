import { ComponentProps, ReactNode } from 'react';

export type ColumnProps<T> = {
	column: keyof T;
	label?: string;
	render?: (rawObject: T, index: number) => string | ReactNode;
	shouldRender?: boolean;
};

export interface TableProviderProps<T> {
	onSelectable?: (values: T[]) => void;
	children: ReactNode;
	rows: T[];
	onTableRowClick?: (item: T) => void;
	keyExtractor?: (item: T) => string;
}

export interface ITableAction<T> {
	key: string;
	label: string;
	onClick?: (item: T[], index: number, actionKey?: string) => void;
	subActions?: (ITableAction<T> & { element?: ReactNode })[];
	shouldHide?: (itens: T[], origin: 'context' | 'dropdown') => boolean;
	shouldHideOnMultiple?: boolean;
	element?: ReactNode;
	disabled?: boolean;
}

export interface TableProps<T>
	extends ComponentProps<'table'> {
	rows: T[];
	onSelectable?: (values: T[]) => void;
	columns: ColumnProps<T>[];
	isSelectableLines?: boolean;
	classNameContainer?: string;
	classNameRow?: string;
	classNameBody?: string;
	onTableRowClick?: (item: T) => void;
	rightClickContent?: ReactNode;
	keyExtractor?: (item: T) => string;
	isLoading?: boolean;
	config?: {
		unSelectOnRightClick?: boolean;
	};
	actions?: ITableAction<T>[];
	classNameEmptyState?: string;
	onOpenChange?: (open: boolean, item: T) => void;
}

export interface TableHeaderProps<T> {
	columns: ColumnProps<T>[];
	rows: T[];
	enableAction?: boolean;
	isSelectableLines?: boolean;
	actions?: ITableAction<T>[];
}

export interface TableRowProps<T> {
	rows: T[];
	columns: ColumnProps<T>[];
	isSelectableLines?: boolean;
	classNameRow?: string;
	classNameBody?: string;
	onTableRowClick?: (item: T) => void;
	config?: {
		unSelectOnRightClick?: boolean;
	};
	actions?: ITableAction<T>[];
	onOpenChange?: (open: boolean, item: T) => void;
}
export interface TableContextMenuProps<T> {
	rows: T[];
	actions?: ITableAction<T>[];
}

export interface TableDropdownMenuProps<T> {
	row: T;
	actions?: ITableAction<T>[];
	onOpenChange: (open: boolean, item: T) => void;
	rowIndex: number;
}

export interface TableContextMenuItemProps<T> {
	rows: T[];
	action: ITableAction<T>;
}

export type ITableContext<T> = {
	rows: T[];
	rowsSelect: any[];
	selectRow: (value: any) => void;
	unSelectRow: (value: any) => void;
	selectAll: (total: Array<any>) => void;
	onHandleSelectRow: (indexRow: number) => void;
	unSelectAll: () => void;
};
