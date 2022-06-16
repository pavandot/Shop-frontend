import { useQueryClient } from 'react-query';
import { Product } from '../components/collectionsItems/CollectionsItems';
import ErrorModal from '../components/ErrorModal';
import Loading from '../components/Loading';
import useGetCartItems from '../hooks/useGetCartItems';
export interface CartItem {
	_id: string;
	product: Product;
	size: string;
	quantity: number;
}
const Cart = () => {
	const queryClint = useQueryClient();
	const { data, isSuccess, isLoading, isError, error } = useGetCartItems();
	const cartQuantity = queryClint.getQueryData('cartQuantity');
	if (isLoading) return <Loading />;
	if (isError) return <ErrorModal message='Something went wrong' open={true} />;
	return (
		<>
			{isSuccess && data && (
				// <section className='max-w-3xl mt-5  px-2 sm:px-5 2xl:px-0 mx-auto'>
				// 	<p className=' text-lg font-medium'>
				// 		Cart <span className=' text-sm md:text-base text-gray-500'>{`(${cartQuantity} items)`}</span>
				// 	</p>
				// </section>
				<p>lol</p>
			)}
		</>
	);
};

export default Cart;
