import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import ErrorModal from './ErrorModal';
import { getFormattedCurrency } from '../utils/getFormattedCurrency';
import { getProduct } from '../hooks/useGetProduct';

const sizeInNumber = [31, 32, 33, 34] as number[];
const sizeInLetter = ['S', 'M', 'L', 'XL'] as string[];
const ProductItem = ({ id }: { id: any }) => {
	const [size, setSize] = useState<number | string>();

	const { data: product } = useSWR(['collections', id], () => getProduct(id));
	if (!product) {
		return <ErrorModal message='Something went wrong' open={true} />;
	}
	return (
		<section className='max-w-[1440px] mt-5  px-2 sm:px-5 2xl:px-0 mx-auto'>
			<div className='p-2 flex flex-col sm:flex-row sm:justify-center sm:space-x-10 sm:max-w-3xl mx-auto'>
				<div className=' sm:w-[30%] lg:w-1/2'>
					<Image src={product.imageURL} alt={product.name} width={330} height={412} layout='responsive' />
				</div>
				<div className=' sm:self-center sm:w-[70%] lg:w-1/2 '>
					<div className=' space-y-1 mt-2'>
						<p className=' text-lg font-medium'>{product.brand}</p>
						<p>{product.name}</p>
						<p className=' font-medium text-lg'>Rs.{getFormattedCurrency(product.amount)}</p>
					</div>
					<div className='mt-5'>
						<div className=' flex items-center space-x-2 '>
							<p className=' text-lg font-medium'>Select Size</p>
							<p>Size Chart</p>
						</div>
						{product.category === 'Jeans' ? (
							<div className='flex items-center space-x-5 mt-2'>
								{sizeInNumber.map((sizeName: number, index: number) => {
									// console.log(sizeName, size);

									return (
										<p
											className={` w-12 text-center cursor-pointer ${
												sizeName === size ? 'border-primary' : 'border-gray-300'
											} flex justify-center items-center h-12  rounded-full border-2`}
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
											className={` w-12 text-center cursor-pointer ${
												sizeName === size ? 'border-primary' : 'border-gray-300'
											} flex justify-center items-center h-12  rounded-full border-2`}
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
					<div className=' w-full mt-5  space-x-4 items-center  flex justify-between'>
						<button className=' w-1/2 cursor-pointer px-10 rounded-md font-medium shadow text-primary border-[1px] border-primary py-3'>
							WishList
						</button>
						<button className=' w-1/2 cursor-pointer px-10 rounded-md font-medium shadow text-white bg-gradient-to-r from-secondary to-primary py-3'>
							Add to Cart
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductItem;
