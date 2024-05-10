'use client';

import React from 'react';
import { Button } from '@/app/ui/button';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useMessagePageForm } from '../../useMessagePageForm';
import { Command } from '@/app/lib/definitions';
import CommandMenu from '@/app/ui/components/CommandMenu';
import { Input } from '@/app/ui/components/Input';

export type IFormContentType = {
	action: (formData: FormData) => Promise<void>;
	commands: Array<Command>;
};

const FormContent: React.FC<IFormContentType> = ({ action, commands }) => {
	const { resetField, register } = useMessagePageForm();

	return (
		<form
			className=" pl-4 flex gap-4 z-[999] overflow-hidden w-full  items-end flex-grow mb-3 pr-4"
			action={async (formData) => {
				await action(formData);
				resetField('payload');
			}}
		>
			<div className="flex relative w-full mt-2 rounded-full shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 items-center">
				<div className="cursor-pointer absolute inset-y-0 left-1 z-20 flex items-center pl-3">
					<CommandMenu commands={commands} />
				</div>
				<Input
					label=""
					placeholder="Escreva sua mensagem..."
					{...register('payload')}
					className="w-full text- resize-none border-0 bg-transparent py-2 pr-10 pl-10 h-fit leading-[1.5em] text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
				/>
			</div>
			<Button
				type="submit"
				className="rounded-full mb-1 bg-indigo-600 p-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>
				<PaperAirplaneIcon className="w-4 h-4" />
			</Button>
		</form>
	);
};

export default FormContent;
