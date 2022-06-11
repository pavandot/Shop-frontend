import { Fragment, useContext, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CloseIcon } from '../../assets/icons';
import FilterSelection from './FilterSelection';
import { FilterContext } from '../../context/FilterContext';
type Props = {
	isFilterOpen: boolean;
	closeFilterModal: () => void;
};

const FilterModal = (props: Props) => {
	const { brandsSelected, categoriesSelected, handelBrandChange, handelCategoryChange } = useContext(FilterContext);

	const { isFilterOpen, closeFilterModal } = props;

	return (
		<Transition appear show={isFilterOpen} as={Fragment}>
			<Dialog as='div' className='relative z-10' onClose={closeFilterModal}>
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
							<Dialog.Panel className=' max-w-[300px] w-full  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title
									as='h3'
									className='text-lg font-medium leading-6 text-primary flex justify-between items-center'
								>
									<span>Filter</span>
									<div className='ml-2' onClick={closeFilterModal}>
										<CloseIcon />
									</div>
								</Dialog.Title>
								<FilterSelection
									brandsSelected={brandsSelected}
									categoriesSelected={categoriesSelected}
									handelBrandChange={handelBrandChange}
									handelCategoryChange={handelCategoryChange}
								/>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default FilterModal;
