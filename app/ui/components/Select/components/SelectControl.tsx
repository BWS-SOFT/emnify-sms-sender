import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import _ from 'lodash';
import { useCallback, useState } from 'react';

import { cn } from '@/app/utils/cn';
import { Badge } from '../../Badge';

type SelectControlProps<T> = {
	data: T[];
	selectedValues: T[];
	error?: string;
	placeholder?: string;
	showPlaceholder: boolean;
	showOptions: boolean;
	filterOptions: boolean;
	multiSelect: boolean;
	getOptionText: (value: T) => string;
	keyExtractor: (value: T) => string | number;
	onRemove: (value: T) => void;
	onChevronIconClick: () => void;
	badge: boolean;
	onMouseLeave?: () => void;
	readOnly?: boolean;
	dynamicInset: boolean;
	input?: {
		className?: string;
	};
};

export function SelectControl<T>({
	keyExtractor,
	getOptionText,
	onChevronIconClick,
	onRemove,
	showOptions,
	data,
	filterOptions,
	error,
	placeholder,
	showPlaceholder,
	selectedValues,
	multiSelect,
	badge,
	onMouseLeave,
	readOnly = false,
	dynamicInset,
	input,
}: SelectControlProps<T>) {
	const [rowTopPosition, setRowTopPosition] = useState<number>(0);
	const [rowXPosition, setRowXPosition] = useState<number>(0);
	const [rowDownPosition, setRowDownPosition] = useState<number>(0);
	const [rowRightPosition, setRowRightPosition] = useState<number>(0);

	const measuredWrapperRef = useCallback(
		(node: HTMLDivElement) => {
			if (!dynamicInset || !node) return;

			if (node) {
				setRowTopPosition(node.getBoundingClientRect().bottom);
				setRowDownPosition(node.getBoundingClientRect().top);
				setRowXPosition(node.getBoundingClientRect().left);
				setRowRightPosition(node.getBoundingClientRect().right);
			}
		},
		[showOptions],
	);

	return (
		<div>
			<div
				onClick={() => !multiSelect && !readOnly && onChevronIconClick()}
				ref={measuredWrapperRef}
				className={cn(
					`flex items-center w-full h-[2.25rem] rounded-md border-0 cursor-pointer
					text-gray-900 focus-within:ring-2 focus-within:ring-indigo-600/70
					transition-all ring-1 ring-inset ring-gray-300
					placeholder:text-gray-400 sm:text-sm sm:leading-6
					      dark:text-white
					`,
					`${!multiSelect ? 'cursor-pointer' : 'cursor-default'}`,
					readOnly && 'bg-gray-50 pointer-events-none',
					input?.className,
				)}
			>
				<div className="flex flex-1 overflow-hidden truncate text-ellipsis items-center px-3 py-1.5">
					{showPlaceholder && (
						<p className="text-gray-500 truncate">{placeholder}</p>
					)}

					{Array.isArray(selectedValues) &&
						selectedValues.length > 0 &&
						selectedValues.map((option) =>
							badge ? (
								<Badge
									label={getOptionText(option)}
									key={keyExtractor(option)}
									isRemoved={multiSelect}
									iconAction={() => multiSelect && onRemove(option)}
									theme="default"
									className="mr-2 whitespace-nowrap"
								/>
							) : (
								<p>{getOptionText(option)}</p>
							),
						)}

					{!Array.isArray(selectedValues) && (
						<span className={cn('block truncate', error && 'text-red-500')}>
							{getOptionText(selectedValues)}
						</span>
					)}
				</div>

				<Listbox.Button
					onClick={() => multiSelect && onChevronIconClick()}
					data-testid="trigger"
					className={`
						px-3 py-1.5 bottom-0 rounded-r-md
						border-gray-300 right-0 flex items-center
						${multiSelect ? 'cursor-pointer' : 'cursor-default'}
					`}
				>
					<ChevronUpDownIcon
						className="h-5 w-5 text-gray-400"
						aria-hidden="true"
					/>
				</Listbox.Button>
			</div>

			<Transition
				show={showOptions}
				leave="transition ease-in duration-100"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				{showOptions && (
					<Listbox.Options
						onMouseLeave={onMouseLeave}
						style={{
							top: showOptions && dynamicInset ? `${rowTopPosition}px` : 0,
							left: showOptions && dynamicInset ? `${rowXPosition}px` : 0,
							right:
								showOptions && dynamicInset
									? `calc(100vw - ${rowRightPosition}px)`
									: 0,
							bottom: showOptions && dynamicInset ? `${rowDownPosition}px` : 0,
						}}
						className={cn(
							'mt-1 min-h-[fit-content] sm:text-sm bg-white border border-gray-200 shadow-lg rounded-md z-50 max-h-[20em] overflow-y-auto overflow-x-hidden flex flex-col py-1 focus:outline-none ring-1 ring-black ring-opacity-5',
							showOptions && '!fixed z-[70]',
						)}
					>
						{(filterOptions ? selectedValues : data)?.map((_data) => (
							<Listbox.Option
								key={keyExtractor(_data)}
								className={({ active }) =>
									cn(
										'transition-all duration-300 ease-in-out',
										selectedValues.find((item) => _.isEqual(item, _data)) ||
											active
											? 'bg-indigo-600 text-white'
											: 'text-gray-900',
										'relative cursor-pointer select-none py-2 pl-3 pr-9',
									)
								}
								value={_data}
							>
								<div className="cursor-pointer">
									<span
										className={cn(
											selectedValues.find((item) => _.isEqual(item, _data))
												? 'font-semibold'
												: 'font-normal',
											'block truncate',
										)}
									>
										{getOptionText(_data)}
									</span>

									{selectedValues.find((item) => _.isEqual(item, _data)) ? (
										<span
											className={cn(
												selectedValues.find((item) => _.isEqual(item, _data))
													? 'text-white'
													: 'text-indigo-600',
												'absolute inset-y-0 right-0 flex items-center pr-4',
											)}
										>
											<CheckIcon className="h-5 w-5" aria-hidden="true" />
										</span>
									) : null}
								</div>
							</Listbox.Option>
						))}
					</Listbox.Options>
				)}
			</Transition>
		</div>
	);
}
