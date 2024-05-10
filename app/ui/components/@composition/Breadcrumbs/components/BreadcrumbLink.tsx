'use client';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { BreadcrumbPage } from '../Breadcrumbs';
import { Button } from '../../../Button';
import { RedirectType, usePathname, useRouter } from 'next/navigation';

interface Props {
	page: Omit<BreadcrumbPage, 'name'> & {
		name?: string;
	};
	lastChild?: boolean;
}

export function BreadcrumbLink({ page, lastChild }: Props) {
	const route = useRouter();
	function handleRedirect() {
		page.onClick?.();
		route.push(page.href as string);
	}

	const path = usePathname();

	return (
		<li
			key={page.name}
			className={`text-gray-500 transition-all ${
				!(path === page.href) && 'hover:text-gray-700 cursor-pointer group'
			}`}
			onClick={handleRedirect}
		>
			<div className={`flex items-center space-x-4`}>
				<div className="flex items-center gap-2">
					{page.icon}

					{page.name && (
						<Button
							size="sm"
							className={`
								p-0 text-gray-500 enabled:group-hover:text-gray-700 
								bg-transparent hover:!bg-transparent shadow-none
								${path === page.href && 'text-gray-800'}
							`}
							disabled={path === page.href}
						>
							{page.name}
						</Button>
					)}
				</div>

				{!lastChild && (
					<ChevronRightIcon
						className="h-5 w-5 flex-shrink-0 text-gray-400 cursor-default"
						aria-hidden="true"
					/>
				)}
			</div>
		</li>
	);
}
