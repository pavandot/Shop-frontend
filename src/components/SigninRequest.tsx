import Link from 'next/link';
import React from 'react';
import { UserIcon } from '../assets/icons';

const SigninRequest = () => {
	return (
		<div className=' text-center min-h-[70vh] flex justify-center items-center '>
			<div>
				<div className=' bg-gray-100 p-4 rounded-full inline-block'>
					<UserIcon />
				</div>
				<div className='pt-6 space-y-5'>
					<p className=' text-2xl font-semibold'>Please Sign In</p>
					<p>Sign In to view items in your wishlist</p>
					<Link href='/signin'>
						<a>
							<button className=' mt-5 w-full cursor-pointer  rounded-md font-medium shadow text-white bg-gradient-to-r from-secondary to-primary py-3'>
								Sign In
							</button>
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SigninRequest;
