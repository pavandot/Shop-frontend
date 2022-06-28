import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import Image from 'next/image';
import useGetProduct, { getProduct } from '../../hooks/collections/useGetProduct';
import { getFormattedCurrency } from '../../utils/getFormattedCurrency';
import { getProducts } from '../../hooks/collections/useGetProducts';
import { Product } from '../../components/collectionsItems/CollectionsItems';
import Loading from '../../components/Loading';
import ErrorModal from '../../components/ErrorModal';
import { useCookies } from 'react-cookie';
import { AuthContext } from '../../context/AuthContext';
import useAddToCart from '../../hooks/cart/useAddToCart';
import Spinner from '../../components/Spinner';
import useAddToWishlist from '../../hooks/wishlist/useAddToWishlist';

export interface CartItem {
	product: string | string[];
	size: string;
	quantity: number;
}

const sizeInNumber = ['31', '32', '33', '34'] as string[];
const sizeInLetter = ['S', 'M', 'L', 'XL'] as string[];
const Product = () => {
	const { isAuthenticated, token } = useContext(AuthContext);
	const [size, setSize] = useState<string>();
	const [isNotSizeSelected, setIsNotSizeSelected] = useState<boolean>(false);
	const router = useRouter();
	const { pid } = router.query;
	const { isError, error, data, isSuccess, isLoading } = useGetProduct(pid);
	const { status: wishlistStatus, mutate: addToWishList } = useAddToWishlist();
	const { status, mutate } = useAddToCart();

	const setSizeHandler = (size: string) => {
		setSize(size);
		setIsNotSizeSelected(false);
	};
	const addToCartHandler = () => {
		if (!isAuthenticated) router.push('/signin');
		else if (!size) setIsNotSizeSelected(true);
		if (size && isAuthenticated && pid && token) {
			const cartItem: CartItem = {
				product: pid,
				size,
				quantity: 1,
			};
			mutate({
				cartItem,
				token,
			});
		}
	};

	const addToWishlistHandler = () => {
		if (!isAuthenticated) router.push('/signin');
		if (isAuthenticated && pid && token) {
			addToWishList(pid);
		}
	};
	if (router.isFallback || isLoading) return <Loading />;

	if (isError || status === 'error' || wishlistStatus === 'error') return <ErrorModal message='Something went wrong' open={true} />;

	return (
		<>
			{isSuccess && data && (
				<section className='max-w-[1440px] mt-5  px-2 sm:px-5 2xl:px-0 mx-auto'>
					<div className='p-2 flex flex-col sm:flex-row sm:justify-center sm:space-x-10 sm:max-w-4xl lg:max-w-3xl mx-auto'>
						<div className=' sm:w-[30%] lg:w-1/2'>
							<Image src={data.imageURL} alt={data.name} width={330} height={412} layout='responsive' />
						</div>
						<div className=' sm:self-center sm:w-[70%] lg:w-1/2 '>
							<div className=' space-y-1 mt-2'>
								<p className=' text-lg font-medium'>{data.brand}</p>
								<p>{data.name}</p>
								<p className=' font-medium text-lg'>Rs.{getFormattedCurrency(data.amount)}</p>
							</div>
							<div className='mt-5'>
								<div className=' flex items-center space-x-2 '>
									<p className=' text-lg font-medium'>Select Size</p>
									<p>Size Chart</p>
								</div>
								{data.category === 'Jeans' ? (
									<div className='flex items-center space-x-5 mt-2'>
										{sizeInNumber.map((sizeName: string, index: number) => {
											// console.log(sizeName, size);

											return (
												<p
													className={` w-12 text-center cursor-pointer ${
														sizeName === size ? 'border-primary' : 'border-gray-300'
													} flex justify-center items-center h-12  rounded-full border-2`}
													key={index}
													onClick={() => setSizeHandler(sizeName)}
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
													className={` w-12 text-center cursor-pointer ${
														sizeName === size ? 'border-primary' : 'border-gray-300'
													} flex justify-center items-center h-12  rounded-full border-2`}
													key={index}
													onClick={() => setSizeHandler(sizeName)}
												>
													{sizeName}
												</p>
											);
										})}
									</div>
								)}
								{isNotSizeSelected && <p className=' text-red-500 mt-1 px-1'>Please select size </p>}
							</div>
							<div className=' w-full mt-5  space-x-4 items-center  flex justify-between'>
								<button
									className=' w-1/2 cursor-pointer flex justify-center items-center rounded-md font-medium shadow text-primary border-[1px] border-primary py-3'
									onClick={addToWishlistHandler}
								>
									{wishlistStatus === 'loading' ? <Spinner color='text-primary' /> : 'WishList'}
								</button>
								<button
									className=' w-1/2 cursor-pointer flex justify-center items-center rounded-md font-medium shadow text-white bg-gradient-to-r from-secondary to-primary py-3'
									onClick={addToCartHandler}
								>
									{status === 'loading' ? <Spinner /> : 'Add to Cart'}
								</button>
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	);
};
export async function getStaticPaths() {
	let paths = {};
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery('products', getProducts);
	const products: Product[] | undefined = queryClient.getQueryData('products');
	if (products) {
		paths = products.map((product: Product) => ({
			params: {
				pid: product._id,
			},
		}));
	}
	return {
		paths,
		fallback: true,
	};
}
export async function getStaticProps(context: any) {
	const id = context.params.pid;
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(['products', id], () => getProduct(id));

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
		revalidate: 30,
	};
}

export default Product;
