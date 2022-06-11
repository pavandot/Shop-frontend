import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import SortRadio from './SortRadio';

type Props = {
	isSortOpen: boolean;
	closeSortModal: () => void;
};

const SortModal = (props: Props) => {
	const { isSortOpen, closeSortModal } = props;
	return (
		<Transition appear show={isSortOpen} as={Fragment}>
			<Dialog as='div' className='relative z-10' onClose={closeSortModal}>
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
							<Dialog.Panel className=' max-w-[220px] w-full  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title as='h3' className='text-lg font-medium leading-6 text-primary'>
									Sort By
								</Dialog.Title>
								<SortRadio closeSortModal={closeSortModal} />
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default SortModal;
