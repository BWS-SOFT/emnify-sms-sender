import { listCommandsfromComandPage } from '@/app/lib/actions';
import { Breadcrumbs } from '@/app/ui/components/@composition/Breadcrumbs';
import { Button } from '@/app/ui/components/Button';
import CommandsList from '@/app/ui/commands-list';
import EndpointsSearchBar from '@/app/ui/endpoint-search-bar';
import Link from 'next/link';
import React from 'react';

const Command: React.FC = async ({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		type?: string;
	};
}) => {
	const query = searchParams?.query || '';
	const type = searchParams?.type || undefined;

	const commandsEntity = await listCommandsfromComandPage(query, type);

	return (
		<>
			<div className="min-h-full">
				<div className="flex flex-col">
					<EndpointsSearchBar
						placeholder="Pesquise pelo comando."
						fieldsForSearch={[
							{
								field: 'name',
								label: 'Nome',
							},
							{
								field: 'description',
								label: 'Descrição',
							},
							{
								field: 'command',
								label: 'Comando',
							},
						]}
					/>
					<div className="flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8">
						<Breadcrumbs
							homePage={{
								href: '/',
							}}
							pages={[
								{
									href: '/comamand',
									name: 'Comandos',
								},
							]}
						/>
					</div>
					<div className="flex w-full items-center justify-end px-6">
						<Link href={'/command/create'}>
							<Button>Cadastrar Comando</Button>
						</Link>
					</div>
					<main className="flex-1">
						<CommandsList commands={commandsEntity} />
					</main>
				</div>
			</div>
		</>
	);
};

export default Command;
