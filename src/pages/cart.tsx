import { CloseIcon } from '../assets/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useQueryClient } from 'react-query';
import { Product } from '../components/collectionsItems/CollectionsItems';
import ErrorModal from '../components/ErrorModal';
import Loading from '../components/Loading';
import useGetCartItems from '../hooks/useGetCartItems';
import { getFormattedCurrency } from '../utils/getFormattedCurrency';
import { useState } from 'react';
import Spinner from '../components/Spinner';
export interface CartItem {
	_id: string;
	product: Product;
	size: string;
	quantity: number;
}

const calculateDiscount = (totalAmount: number) => {
	const discount = Math.round(totalAmount * 0.15);
	return getFormattedCurrency(discount);
};
const finalAmount = (totalAmount: number) => {
	const discount = Math.round(totalAmount * 0.15);
	const finalAmount = totalAmount - discount;
	return getFormattedCurrency(finalAmount);
};
const Cart = () => {
	const queryClint = useQueryClient();
	const { data, isSuccess, isLoading, isError, error } = useGetCartItems();
	const cartQuantity = queryClint.getQueryData('cartQuantity');
	const [isPurchased, setIsPurchased] = useState(false);
	if (isLoading) return <Loading />;
	if (isError) return <ErrorModal message='Something went wrong' open={true} />;
	const onPurchase = () => {
		setIsPurchased(true);
		setTimeout(() => {
			setIsPurchased(false);
		}, 2000);
	};
	return (
		<>
			{isSuccess && data && (
				<section className='max-w-3xl my-5  px-2 sm:px-5 2xl:px-0 mx-auto'>
					<div className=' flex w-full justify-center flex-col sm:flex-row '>
						<div className='max-w-xl  grow'>
							<p className=' text-lg font-medium'>
								Cart <span className='  text-gray-500'>{`(${cartQuantity} items)`}</span>
							</p>
							<div className=' mt-5 space-y-5  '>
								{data.cartItems.map((item: CartItem) => {
									const { _id, product, size, quantity } = item;
									const { _id: ProductId, name, amount, brand, category, imageURL } = product;
									return (
										<section
											key={_id}
											className='flex space-x-6 w-full bg-gray-50 border-[2px] border-gray-200 rounded '
										>
											<Link href={`/collections/${ProductId}`}>
												<a className=' w-[35%] sm:w-[20%]'>
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
											<div className=' space-y-1 grow p-1'>
												<div className=' flex justify-between items-center'>
													<p className=' font-medium text-lg'>{brand}</p>
													<CloseIcon />
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
						<div className=' grow sm:max-w-[200px] mt-5 sm:mt-0 w-full sm:mx-8'>
							<p className=' text-lg font-medium'>Price details</p>
							<div className='mt-5 space-y-3 '>
								<div className='flex justify-between'>
									<p>Price</p>
									<p> Rs. {getFormattedCurrency(data.totalAmount)}</p>
								</div>
								<div className='flex justify-between'>
									<p>Price</p>
									<p>- Rs. {calculateDiscount(data.totalAmount)}</p>
								</div>
								<div className='flex justify-between'>
									<p>Shipping</p>
									<p>FREE</p>
								</div>
							</div>
							<hr className=' mt-5' />
							<div className=' flex font-medium justify-between mt-4'>
								<p>Total Amount</p>
								<p>Rs. {finalAmount(data.totalAmount)}</p>
							</div>
							<button
								className=' w-full mt-5 py-3 text-center flex justify-center items-center bg-gradient-to-r  from-secondary hover:from-primary to-primary hover:to-secondary rounded-md text-white font-medium'
								onClick={onPurchase}
							>
								{isPurchased ? <Spinner /> : 'Place Order'}
							</button>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default Cart;
