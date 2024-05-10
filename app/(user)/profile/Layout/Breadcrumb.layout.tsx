'use client';
import { Breadcrumbs } from '@/app/ui/components/@composition/Breadcrumbs';
import React from 'react';

// import { Container } from './styles';

const BreadCrumbLayout: React.FC = () => {
	return (
		<Breadcrumbs
			homePage={{
				href: '/',
			}}
			pages={[
				{
					name: 'Meu usuário',
					href: '/profile',
				},
			]}
		/>
	);
};

export default BreadCrumbLayout;
