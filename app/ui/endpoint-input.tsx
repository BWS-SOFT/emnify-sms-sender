'use client';
import { RadioGroup } from '@headlessui/react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
	ChevronRightIcon,
	MagnifyingGlassCircleIcon,
	XCircleIcon,
} from '@heroicons/react/24/outline';
import { Simcard } from '../lib/definitions';
import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import EndpointsSearchBar from './endpoint-search-bar';
import { cn } from '../utils/cn';
import { useIsOnSmallScreens } from './hooks/useIsOnSmallScreens';

type EndpointsInputProps = {
	simcards: Simcard[];
};

export default function EndpointsInput({ simcards }: EndpointsInputProps) {
	const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
	const [selected, setSelected] = useState<string>('');

	const isOnSmallerScreens = useIsOnSmallScreens();

	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSelect = useDebouncedCallback((term) => {
		const params = new URLSearchParams(searchParams);

		if (term) {
			params.set('endpoint_id', term.endpoint_id);
		} else {
			params.delete('endpoint_id');
		}

		replace(`${pathname}?${params.toString()}`);

		if (term) {
			params.set('endpoint_name', term.endpoint_name);
		} else {
			params.set('endpoint_name', term);
		}

		replace(`${pathname}?${params.toString()}`);

		if (term) {
			params.set('endpoint_imei', term.endpoint_imei);
		} else {
			params.set('endpoint_imei', term);
		}

		replace(`${pathname}?${params.toString()}`);
	}, 300);

	useEffect(() => {
		const haveEndpointOnSearchParams = !!searchParams.get('endpoint_id');

		if (haveEndpointOnSearchParams) {
			setIsFullScreen(false);
		}
	}, [searchParams]);

	return (
		<>
			{isOnSmallerScreens && !isFullScreen && (
				<MagnifyingGlassCircleIcon
					role="button"
					onClick={() => setIsFullScreen(true)}
					className={cn(
						'text-gray-500 w-10 h-10 absolute right-4 translate-y-2',
						!!searchParams.get('endpoint_id') && 'right-20',
					)}
				/>
			)}

			<div
				className={cn(
					'z-40 flex items-start justify-start min-w-[350px] bg-white overflow-y-auto',
					isOnSmallerScreens && !isFullScreen && 'hidden',
					isOnSmallerScreens &&
						isFullScreen &&
						'inset-0 fixed items-center justify-center max-h-[80%] min-w-screen pt-14',
				)}
			>
				{isOnSmallerScreens && isFullScreen && (
					<XCircleIcon
						role="button"
						className="text-gray-500 w-12 h-12 absolute z-50 right-2 top-2"
						onClick={() => setIsFullScreen(false)}
					/>
				)}

				<RadioGroup
					className={cn(
						'w-full border-gray-200 border-r-[1px] h-full cols-span-1',
						isOnSmallerScreens && isFullScreen && '',
					)}
					value={selected}
					onChange={(e) => {
						setSelected(e);
					}}
					name="device_id"
				>
					<EndpointsSearchBar
						placeholder={'Pesquise por um simcard'}
						selectClassName="w-32"
						fieldsForSearch={[
							{
								field: 'endpoint_name',
								label: 'Nome',
							},
							{
								field: 'sim_iccid_with_luhn',
								label: 'Iccid',
							},
							{
								field: 'endpoint_imei',
								label: 'Imei',
							},
							{
								field: 'sim_msisdn',
								label: 'Simcard',
							},
						]}
					/>

					<RadioGroup.Label className="sr-only">
						Endpoints selection
					</RadioGroup.Label>

					{simcards?.map((simcard) => (
						<RadioGroup.Option
							key={simcard.emnify.endpoint_name}
							value={simcard.emnify.endpoint_id}
							onClick={() => {
								handleSelect(simcard.emnify);
							}}
							className={({ checked }) =>
								clsx(
									checked
										? 'z-10 border-indigo-400 bg-indigo-100'
										: 'border-gray-200',
									'relative flex cursor-pointer flex-col  p-4 focus:outline-none md:grid md:grid-cols-2 md:pl-4 md:pr-6 hover:bg-indigo-50',
								)
							}
						>
							{() => (
								<>
									<div className="flex min-w-0 gap-x-4">
										<div className="flex items-center gap-2 pl-3">
											<div className="min-w-0 flex flex-col">
												<p className="text-sm font-semibold  text-gray-900">
													<span className="absolute inset-x-0 -top-px bottom-0" />
													{simcard.emnify.endpoint_name}
												</p>
												<p className="text-xs text-gray-500 mt-[-1px]">
													{simcard.emnify.endpoint_imei}
												</p>
											</div>
										</div>
									</div>
									<div className="flex flex-1 justify-end items-center gap-x-4">
										<ChevronRightIcon
											className="h-5 w-5 flex-none text-gray-400"
											aria-hidden="true"
										/>
									</div>
								</>
							)}
						</RadioGroup.Option>
					))}
				</RadioGroup>
			</div>
		</>
	);
}
