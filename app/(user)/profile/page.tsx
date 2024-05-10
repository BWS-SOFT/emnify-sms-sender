import { changeUserPassword } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';
import BreadCrumbLayout from './Layout/Breadcrumb.layout';

export default function Profile() {
	return (
		<div className="min-h-full">
			<div
				className="flex items-center space-x-4 px-4 py-4
sm:px-6 lg:px-8"
			>
				<BreadCrumbLayout />
			</div>

			<form className="p-4 sm:px-6 lg:px-8" action={changeUserPassword}>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
					<div>
						<h2 className="text-base font-semibold leading-7 text-gray-900">
							Alteração de senha
						</h2>
						<p className="mt-1 text-sm leading-6 text-gray-600">
							Mude a senha do seu usuário para uma nova.
						</p>
					</div>

					<div className="grid grid-rows-3 col-span-1 gap-x-6 gap-y-4 sm:grid-cols-6 md:col-span-2">
						<div className="col-span-full">
							<label
								htmlFor="new_password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Nova senha
							</label>
							<div className="mt-2">
								<input
									type="password"
									name="new_password"
									id="new_password"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div className="col-span-full">
							<label
								htmlFor="confirm_new_password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Confirmar nova senha
							</label>
							<div className="mt-2">
								<input
									type="password"
									name="confirm_new_password"
									id="confirm_new_password"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="flex w-full col-span-full items-center justify-end gap-6">
							<Button
								type="submit"
								className="rounded-md bg-indigo-600 w-auto px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Confirmar alteração de senha
							</Button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
