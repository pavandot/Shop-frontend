import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CloseIcon } from '../assets/icons';

type Props = {
	message: string;
	open: boolean;
};
const ErrorModal = (props: Props) => {
	const { message, open } = props;
	const [isErrorModal, setIsErrorModal] = useState(open);
	return (
		<Transition appear show={isErrorModal} as={Fragment}>
			<Dialog as='div' className='relative z-10' onClose={() => setIsErrorModal(false)}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-black bg-opacity-25' />
				</Transition.Child>
				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<Dialog.Panel className=' max-w-xl w-auto  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title
									as='h3'
									className='text-lg font-medium leading-6 text-red-500 flex justify-between items-center space-x-3'
								>
									<span>{message}</span>
									<div
										onClick={() => {
											setIsErrorModal(false);
										}}
									>
										<CloseIcon />
									</div>
								</Dialog.Title>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default ErrorModal;
