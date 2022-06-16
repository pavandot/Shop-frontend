import React from 'react';
import { CartIcon } from '../../assets/icons';

const CartEmpty = () => {
	return (
		<div className=' text-center min-h-[70vh] flex justify-center items-center '>
			<div>
				<div className=' bg-blue-200 p-2 rounded-full inline-block'>
					<CartIcon />
				</div>
				<p>Your cart is empty</p>
			</div>
		</div>
	);
};

export default CartEmpty;
