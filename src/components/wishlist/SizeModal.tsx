import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useContext, useState } from 'react';
import { CloseIcon } from '../../assets/icons';
import { AuthContext } from '../../context/AuthContext';
import useAddToCart from '../../hooks/cart/useAddToCart';
import { WishlistInterface } from '../../hooks/wishlist/useGetWishlist';
import { CartItem } from '../../pages/collections/[pid]';
import Spinner from '../Spinner';

interface Props {
	isSortOpen: boolean;
	setIsSizeModalOpen: (arg0: boolean) => void;
	wishlistItem: WishlistInterface;
}

const sizeInNumber = ['31', '32', '33', '34'] as string[];
const sizeInLetter = ['S', 'M', 'L', 'XL'] as string[];

const SizeModal = ({ isSortOpen, setIsSizeModalOpen, wishlistItem }: Props) => {
	const { token } = useContext(AuthContext);
	const [size, setSize] = useState<string>();
	const closeSizeModal = () => {
		setIsSizeModalOpen(false);
		setSize('');
	};
	const { status, mutate } = useAddToCart();
	const addToCartHandler = () => {
		if (size && token) {
			const cartItem: CartItem = {
				product: wishlistItem.product._id,
				size,
				quantity: 1,
			};
			mutate({
				cartItem,
				token,
			});
		}
	};
	return (
		<Transition appear show={isSortOpen} as={Fragment}>
			<Dialog as='div' className='relative z-10' onClose={closeSizeModal}>
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
							<Dialog.Panel className=' max-w-[270px] w-full  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title
									as='h3'
									className='text-lg font-medium leading-6 text-primary flex justify-between items-center'
								>
									<span>Select size</span>
									<div className='ml-2 cursor-pointer' onClick={closeSizeModal}>
										<CloseIcon />
									</div>
								</Dialog.Title>
								<div className='mt-5'>
									{wishlistItem?.product.category === 'Jeans' ? (
										<div className='flex items-center space-x-5 mt-2'>
											{sizeInNumber.map((sizeName: string, index: number) => {
												// console.log(sizeName, size);

												return (
													<p
														className={` w-10 text-center cursor-pointer ${
															sizeName === size ? 'border-primary' : 'border-gray-300'
														} flex justify-center items-center h-10  rounded-full border-2`}
														key={index}
														onClick={() => setSize(sizeName)}
													>
														{sizeName}
													</p>
												);
											})}
										</div>
									) : (
										<div className='flex items-center space-x-5 mt-2'>
											{sizeInLetter.map((sizeName: string, index: number) => {
												return (
													<p
														className={` w-10 text-center cursor-pointer ${
															sizeName === size ? 'border-primary' : 'border-gray-300'
														} flex justify-center items-center h-10  rounded-full border-2`}
														key={index}
														onClick={() => setSize(sizeName)}
													>
														{sizeName}
													</p>
												);
											})}
										</div>
									)}
								</div>
								<button
									className=' mt-5 w-full cursor-pointer flex justify-center items-center rounded-md font-medium shadow text-white bg-gradient-to-r from-secondary to-primary py-3'
									onClick={addToCartHandler}
								>
									{status === 'loading' ? <Spinner /> : 'Done'}
								</button>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default SizeModal;
