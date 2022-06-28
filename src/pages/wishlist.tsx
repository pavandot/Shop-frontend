import React from 'react';
import Loading from '../components/Loading';
import WishlistItem from '../components/wishlist/WishlistItem';
import useGetWishlist from '../hooks/wishlist/useGetWishlist';

const Wishlist = () => {
	const { status, data: wishlist } = useGetWishlist();
	if (status === 'loading') {
		return <Loading />;
	}
	return (
		<>
			{status === 'success' && wishlist && (
				<section className='max-w-[1440px]  px-2 sm:px-5 2xl:px-0 mx-auto'>
					<h1 className=' text-lg py-3'>
						<span className=' font-semibold'>Wishlist</span>
						{'(' + wishlist.length + ' items' + ')'}{' '}
					</h1>
					<section className='grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4'>
						<WishlistItem wishlist={wishlist} />
					</section>
				</section>
			)}
		</>
	);
};

export default Wishlist;
