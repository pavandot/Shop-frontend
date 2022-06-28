import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { CloseIcon } from '../../assets/icons';
import useDeleteWishlist from '../../hooks/wishlist/useDeleteWishlist';
import { WishlistInterface } from '../../hooks/wishlist/useGetWishlist';
import { getFormattedCurrency } from '../../utils/getFormattedCurrency';
import { Product } from '../collectionsItems/CollectionsItems';
import SizeModal from './SizeModal';

interface Props {
	wishlist: WishlistInterface[];
}

const WishlistItem = (props: Props) => {
	const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<WishlistInterface>();
	const { wishlist } = props;
	const { status, mutate } = useDeleteWishlist();

	const wishlistDeleteHandler = (productId: string) => {
		mutate(productId);
	};
	const addToCartHandler = (wishlist: WishlistInterface) => {
		setSelectedProduct(wishlist);
		setIsSizeModalOpen(true);
	};
	return (
		<>
			{wishlist &&
				wishlist.map((list: WishlistInterface, index) => {
					const { _id, imageURL, brand, category, name, amount } = list.product;
					const formattedAmount = getFormattedCurrency(amount);
					return (
						<div key={_id} className=' border-[1px] shadow overflow-hidden rounded text-sm w-full relative '>
							<Link href={`/collections/${_id}`} key={_id}>
								<a>
									<Image src={imageURL} alt={name} width={150} height={170} layout='responsive' priority={index < 8} />
								</a>
							</Link>
							<div className=' p-2 space-y-1 flex-col flex justify-between    '>
								<p>{brand}</p>
								<p className=' text-gray-400'>{name}</p>
								<p>Rs.{formattedAmount}</p>
							</div>
							<div className='p-2 border-t-2 text-center'>
								<p className=' text-blue-500 font-semibold cursor-pointer ' onClick={() => addToCartHandler(list)}>
									Move to Cart
								</p>
							</div>
							<div className=' absolute top-2 right-2  '>
								<div
									className='bg-gray-200 rounded-full p-[1px] cursor-pointer'
									onClick={() => wishlistDeleteHandler(list['_id'])}
								>
									<CloseIcon />
								</div>
							</div>
						</div>
					);
				})}
			<>
				{selectedProduct && (
					<SizeModal isSortOpen={isSizeModalOpen} setIsSizeModalOpen={setIsSizeModalOpen} wishlistItem={selectedProduct} />
				)}
			</>
		</>
	);
};

export default WishlistItem;
