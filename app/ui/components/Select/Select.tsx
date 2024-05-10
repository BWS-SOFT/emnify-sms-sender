import { Listbox } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/24/outline';

import { SelectControl } from './components/SelectControl';

import { cn } from '@/app/utils/cn';
import _ from 'lodash';
import { SelectSeeOptionsButton } from './components/SelectSeeOptionsButton';
import { useSelect } from './useSelect';
type SelectProps<T> = {
	label: string;
	data: T[];
	selected?: T[];
	setter: (value: T[]) => void;
	getOptionText: (value: T) => string;
	keyExtractor: (value: T) => string;
	error?: string;
	className?: string;
	placeholder?: string;
	multiSelect?: boolean;
	minLengthBeforeOptionsButtonAppear?: number;
	badge?: boolean;
	readOnly?: boolean;
	dynamicInset?: boolean;
	testID?: string;
	input?: {
		className?: string;
	};
	disablelabel?: boolean;
};

export function Select<T>({
	setter,
	getOptionText,
	keyExtractor,
	minLengthBeforeOptionsButtonAppear,
	label,
	data,
	selected = [],
	error,
	className,
	placeholder,
	multiSelect = false,
	badge = true,
	readOnly = false,
	dynamicInset = true,
	testID,
	input,
	disablelabel = false,
}: SelectProps<T>) {
	const {
		setFilterShowOptions,
		setShowOptions,
		showOptions,
		filterShowOptions,
		showPlaceholder,
	} = useSelect({ selected });

	return (
		<Listbox
			data-testid={testID}
			value={selected}
			onChange={(item: T[] | T) => {
				setter(Array.isArray(item) ? item : [item]);
			}}
			multiple={multiSelect}
		>
			<div className={cn('relative', className)}>
				{!disablelabel && (
					<Listbox.Label
						className="block text-sm font-medium leading-6 text-gray-900"
						onClick={() => setShowOptions((prev) => !prev)}
					>
						{label}
					</Listbox.Label>
				)}

				<SelectControl
					dynamicInset={dynamicInset}
					readOnly={readOnly}
					multiSelect={multiSelect}
					data={data}
					filterOptions={filterShowOptions}
					getOptionText={getOptionText}
					keyExtractor={keyExtractor}
					input={input}
					badge={badge}
					onRemove={(value) => {
						const result = selected.filter((item) => !_.isEqual(item, value));

						if (
							minLengthBeforeOptionsButtonAppear &&
							result.length < minLengthBeforeOptionsButtonAppear
						) {
							setFilterShowOptions(false);
						}

						setter([...result]);
					}}
					selectedValues={selected}
					onChevronIconClick={() => setShowOptions((prev) => !prev)}
					showOptions={showOptions}
					showPlaceholder={showPlaceholder}
					error={error}
					placeholder={placeholder}
					onMouseLeave={() => setShowOptions(false)}
				/>

				{Array.isArray(selected) && (
					<SelectSeeOptionsButton
						label={filterShowOptions ? 'Ver todos' : 'Ver apenas selecionados'}
						show={
							minLengthBeforeOptionsButtonAppear !== undefined &&
							minLengthBeforeOptionsButtonAppear <= selected.length
								? true
								: false
						}
						onClick={() => {
							setFilterShowOptions((prev) => !prev);
							setShowOptions(true);
						}}
					/>
				)}

				{error && (
					<div className="flex gap-1 absolute items-center translate-y-[calc(100%+2px)] bottom-0 text-red-500">
						<XCircleIcon className="w-4 h-4" />
						<span className="text-xs">{error}</span>
					</div>
				)}
			</div>
		</Listbox>
	);
}
