import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { CartItem } from '../../pages/cart';
import { CloseIcon } from '../../assets/icons';
import { getFormattedCurrency } from '../../utils/getFormattedCurrency';
import useDeletedCartItem from '../../hooks/cart/useDeletedCartItem';
import ErrorModal from '../ErrorModal';
import { useQueryClient } from 'react-query';
interface CartItemProps {
	cartQuantity: number;
	cartItems: CartItem[];
}
const CartItem = ({ cartItems, cartQuantity }: CartItemProps) => {
	const { status, mutate } = useDeletedCartItem();
	const queryClient = useQueryClient();

	const previousCartItems = queryClient.getQueryData('cart');
	console.log(previousCartItems);

	return (
		<>
			<div className='max-w-xl  grow'>
				<p className=' text-lg font-medium'>
					Cart <span className='  text-gray-500'>{`(${cartQuantity} items)`}</span>
				</p>
				<div className=' mt-5 space-y-5  '>
					{cartItems.map((item: CartItem) => {
						const { _id, product, size, quantity } = item;
						const { _id: ProductId, name, amount, brand, imageURL } = product;
						return (
							<section key={_id} className='flex space-x-6 w-full bg-gray-50 border-[2px] border-gray-200 rounded '>
								<Link href={`/collections/${ProductId}`}>
									<a className=' w-[35%] sm:w-[25%]'>
										<Image
											width={110}
											height={138}
											layout='responsive'
											src={imageURL}
											alt={name}
											className='object-cover'
										/>
									</a>
								</Link>
								<div className=' space-y-1 grow pt-2 px-2'>
									<div className=' flex justify-between items-center'>
										<p className=' font-medium text-lg'>{brand}</p>
										<div
											className=' cursor-pointer'
											onClick={() => {
												mutate(_id);
											}}
										>
											<CloseIcon />
										</div>
									</div>
									<p className=' text-sm text-gray-500'>{name}</p>
									<div className=' flex items-center space-x-3 py-2 text-sm'>
										<p className=' bg-gray-300 py-[1px] px-2 rounded'>Size: {size}</p>
										<p className=' bg-gray-300 py-[1px] px-2 rounded'>Quantity: {quantity}</p>
									</div>
									<p className=' text-sm font-medium'>
										{quantity} x Rs. {getFormattedCurrency(amount)}
									</p>
								</div>
							</section>
						);
					})}
				</div>
			</div>
			{status === 'error' && <ErrorModal message='Something went wrong' open={true} />}
		</>
	);
};

export default CartItem;
