import Link from 'next/link';
import React from 'react';
import { CheckIcon } from '../../assets/icons';

const CartFinal = () => {
	return (
		<div className=' text-center min-h-[70vh] flex justify-center items-center '>
			<div>
				<div className='p-2 border-2 border-primary rounded-full inline-block'>
					<CheckIcon />
				</div>
				<p className=' mt-4 text-2xl font-medium'>Order placed successfully</p>
				<Link href='/collections' replace>
					<a className=' w-full mt-5 py-3 text-center flex justify-center items-center bg-gradient-to-r  from-secondary hover:from-primary to-primary hover:to-secondary rounded-md text-white font-medium'>
						continue shopping
					</a>
				</Link>
			</div>
		</div>
	);
};

export default CartFinal;
