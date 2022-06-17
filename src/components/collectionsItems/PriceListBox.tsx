import { Fragment, useContext, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { sortContext } from '../../context/SortContext';
const prices = [
	{
		name: 'Default',
		value: 'default',
	},
	{
		name: 'Low to High',
		value: 'priceLowToHigh',
	},
	{
		name: 'High to Low',
		value: 'priceHighToLow',
	},
];

const PriceListBox = () => {
	const { setSort } = useContext(sortContext);
	const [selected, setSelected] = useState(prices[0]);

	return (
		<div className=' hidden  bg-white z-10 sm:flex justify-between pb-3 items-start'>
			<p className=' text-lg font-medium'>Collections</p>
			<div className=' w-40'>
				<Listbox value={selected} onChange={setSelected}>
					<div className='relative mt-1'>
						<Listbox.Button className='relative w-full cursor-default rounded border-[1px] bg-white py-2 pl-3 pr-10 text-left  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2  sm:text-sm'>
							<span className='block truncate'>{selected.name}</span>
							<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
								<SelectorIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
							</span>
						</Listbox.Button>
						<Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
							<Listbox.Options className='absolute z-10 mt-1  max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
								{prices.map((price, priceIdx) => (
									<Listbox.Option
										key={priceIdx}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active ? 'bg-primary text-gray-100' : 'text-gray-900'
											}`
										}
										value={price}
										onClick={() => {
											setSort(price.value);
										}}
									>
										{({ selected }) => (
											<>
												<span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
													{price.name}
												</span>
												{selected ? (
													<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-300'>
														<CheckIcon className='h-5 w-5' aria-hidden='true' />
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</Listbox>
			</div>
		</div>
	);
};

export default PriceListBox;
