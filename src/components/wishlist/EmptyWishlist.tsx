import React from 'react';
import { WishlistIcon } from '../../assets/icons';

const EmptyWishlist = () => {
	return (
		<div className=' text-center min-h-[70vh] flex justify-center items-center '>
			<div>
				<div className=' bg-blue-200 p-2 rounded-full inline-block'>
					<WishlistIcon />
				</div>
				<p className=''>Your wishlist is empty</p>
			</div>
		</div>
	);
};

export default EmptyWishlist;
