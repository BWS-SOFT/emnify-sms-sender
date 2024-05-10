'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from './components/@composition/Input';
import { Input as Fake } from './components/Input';
import { Select } from './components/Select';
import { useCallback } from 'react';
import { cn } from '../utils/cn';

export default function EndpointsSearchBar({
	placeholder,
	conatinerClassname,
	fieldsForSearch = [],
	selectClassName,
}: {
	placeholder: string;
	conatinerClassname?: string;
	fieldsForSearch?: Array<{ label: string; field: string }>;
	selectClassName?: string;
}) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set('query', term);
		} else {
			params.delete('query');
		}
		replace(`${pathname}?${params.toString()}`);
	}, 300);

	const handleChangeType = useDebouncedCallback((type: string) => {
		const params = new URLSearchParams(searchParams);
		if (type) {
			params.set('type', type);
		} else {
			params.delete('type');
		}
		replace(`${pathname}?${params.toString()}`);
	}, 300);

	const findOption = useCallback(() => {
		const params = new URLSearchParams(searchParams);
		const repsonse = fieldsForSearch.find(
			(field) => field.field === params.get('type'),
		);
		return repsonse ? [repsonse] : undefined;
	}, [fieldsForSearch, searchParams]);

	return (
		<>
			<div className={clsx('flex relative mb-2 h-12', conatinerClassname)}>
				<Input.Root>
					<Input.Group className="rounded-none">
						<Input.AddOn className="bg-gray-100 ring-0 border-0">
							<MagnifyingGlassIcon
								className="pointer-events-none absolute left-4 lg:left-8 top-3.5 h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</Input.AddOn>
						<Input.Field
							placeholder={placeholder}
							className="h-12 w-full border-0 rounded-none text-black placeholder:text-gray-400 dark:text-black pl-10 focus:ring-0 sm:text-sm ring-0 bg-gray-100"
							onChange={(e) => handleSearch(e.target.value)}
						/>
					</Input.Group>
				</Input.Root>
				<Select
					data={fieldsForSearch}
					input={{
						className: cn(
							'h-full bg-gray-100 rounded-none border-0 ring-0 w-40',
							selectClassName,
						),
					}}
					className="h-full"
					getOptionText={(option) => option.label}
					keyExtractor={(option) => option.field}
					label=""
					setter={(option) => handleChangeType(option[0].field)}
					selected={findOption()}
				/>
				{/* <select
					id="currency"
					name="currency"
					className="absolute top-0 right-4 lg:right-8 h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
					onChange={(e) => handleChangeType(e.target.value)}
				>
					{fieldsForSearch.map((data, key) => (
						<option value={data.field} key={key}>
							{data.label}
						</option>
					))}
				</select> */}
			</div>
		</>
	);
}
