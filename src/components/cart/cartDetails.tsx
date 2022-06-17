import React, { useState } from 'react';
import useDeleteCart from '../../hooks/cart/useDeleteCart';
import { getFormattedCurrency } from '../../utils/getFormattedCurrency';
import Spinner from '../Spinner';

const calculateDiscount = (totalAmount: number) => {
	const discount = Math.round(totalAmount * 0.15);
	return getFormattedCurrency(discount);
};
const finalAmount = (totalAmount: number) => {
	const discount = Math.round(totalAmount * 0.15);
	const finalAmount = totalAmount - discount;
	return getFormattedCurrency(finalAmount);
};

const CartDetails = ({ totalAmount }: { totalAmount: number }) => {
	const [isPurchased, setIsPurchased] = useState(false);
	const { status, mutate, isLoading } = useDeleteCart();
	const onPurchase = () => {
		mutate();
	};
	return (
		<div className=' grow sm:max-w-[200px] mt-5 sm:mt-0 w-full sm:mx-8'>
			<p className=' text-lg font-medium'>Price details</p>
			<div className='mt-5 space-y-3 '>
				<div className='flex justify-between'>
					<p>Price</p>
					<p> Rs. {getFormattedCurrency(totalAmount)}</p>
				</div>
				<div className='flex justify-between'>
					<p>Price</p>
					<p>- Rs. {calculateDiscount(totalAmount)}</p>
				</div>
				<div className='flex justify-between'>
					<p>Shipping</p>
					<p>FREE</p>
				</div>
			</div>
			<hr className=' mt-5' />
			<div className=' flex font-medium justify-between mt-4'>
				<p>Total Amount</p>
				<p>Rs. {finalAmount(totalAmount)}</p>
			</div>
			<button
				className=' w-full mt-5 py-3 text-center flex justify-center items-center bg-gradient-to-r  from-secondary hover:from-primary to-primary hover:to-secondary rounded-md text-white font-medium'
				onClick={onPurchase}
			>
				{isLoading ? <Spinner /> : 'Place Order'}
			</button>
		</div>
	);
};

export default CartDetails;
