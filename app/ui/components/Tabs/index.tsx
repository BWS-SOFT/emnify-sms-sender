'use client';
import * as RdxTabs from '@radix-ui/react-tabs';
import { cn } from '@/app/utils/cn';
import { ReactNode } from 'react';

type ComponentsCommonProps = {
	children: ReactNode;
	className?: string;
};

type RootProps = ComponentsCommonProps & {
	defaultTab: string;
};

function Root({ children, defaultTab, className }: RootProps) {
	return (
		<RdxTabs.Root
			defaultValue={defaultTab}
			className={cn('w-full h-full', className)}
		>
			{children}
		</RdxTabs.Root>
	);
}

type HeaderProps = RdxTabs.TabsListProps;

function Header({ children, className, ...props }: HeaderProps) {
	return (
		<RdxTabs.List
			{...props}
			className={cn('flex font-bold font-inter', className)}
		>
			{children}
		</RdxTabs.List>
	);
}

type TriggerProps = ComponentsCommonProps & {
	value: string;
	onClick?: () => void;
};

function Trigger({ children, value, className, onClick }: TriggerProps) {
	return (
		<RdxTabs.Trigger
			onClick={onClick}
			value={value}
			className={cn(
				'font-bold font-inter py-2 px-2 text-gray-500 border-b-2 border-white text-sm transition ease-in-out duration-300',
				'hover:text-indigo-600 hover:border-indigo-600',
				'data-[state=active]:text-indigo-600 data-[state=active]:border-indigo-600',
				className,
			)}
		>
			{children}
		</RdxTabs.Trigger>
	);
}

type ContentProps = ComponentsCommonProps & {
	value: string;
};

function Content({ children, value, className }: ContentProps) {
	return (
		<RdxTabs.Content value={value} className={className}>
			{children}
		</RdxTabs.Content>
	);
}

export const Tabs = {
	Root,
	Header,
	Trigger,
	Content,
};
