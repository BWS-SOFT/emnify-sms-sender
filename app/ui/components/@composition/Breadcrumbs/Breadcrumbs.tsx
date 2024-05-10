'use client';

import { ReactNode } from 'react';
import { HomeIcon } from '@heroicons/react/20/solid';
import { BreadcrumbLink } from './components/BreadcrumbLink';

export interface BreadcrumbPage {
	name: string;
	href: string;
	icon?: ReactNode;
}

interface Props {
	homePage?: Omit<BreadcrumbPage, 'name'>;
	pages: BreadcrumbPage[];
}

export function Breadcrumbs({ pages, homePage }: Props) {
	return (
		<nav className="flex" aria-label="Breadcrumb">
			<ol role="list" className="flex items-center space-x-4">
				{homePage && (
					<BreadcrumbLink
						page={{
							...homePage,
							icon: <HomeIcon className="h-5 w-5 flex-shrink-0" />,
						}}
					/>
				)}

				{pages.map((page, index) => (
					<BreadcrumbLink
						key={page.name}
						page={page}
						lastChild={index === pages.length - 1}
					/>
				))}
			</ol>
		</nav>
	);
}
