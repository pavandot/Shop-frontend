import { useQueryClient } from 'react-query';
import { Product } from '../components/collectionsItems/CollectionsItems';
import ErrorModal from '../components/ErrorModal';
import Loading from '../components/Loading';
import useGetCartItems from '../hooks/cart/useGetCartItems';
import CartItem from '../components/cart/cartItem';
import CartDetails from '../components/cart/cartDetails';
import CartEmpty from '../components/cart/cartEmpty';
import CartFinal from '../components/cart/cartFinal';
import useDeleteCart from '../hooks/cart/useDeleteCart';
export interface CartItem {
	_id: string;
	product: Product;
	size: string;
	quantity: number;
}

const Cart = () => {
	const { status, mutate, isLoading } = useDeleteCart();
	const queryClint = useQueryClient();
	const { data, isSuccess, isLoading: cartLoading, isError, error } = useGetCartItems();
	const cartQuantity: number | undefined = queryClint.getQueryData('cartQuantity');
	if (cartLoading) return <Loading />;
	if (isError) return <ErrorModal message='Something went wrong' open={true} />;
	if (data?.cartItems.length === 0 && status !== 'success') return <CartEmpty />;
	if (status === 'success') return <CartFinal />;
	const onPurchase = () => {
		mutate();
	};
	return (
		<>
			{isSuccess && data && (
				<section className='max-w-3xl my-5  px-2 sm:px-5 2xl:px-0 mx-auto'>
					<div className=' flex w-full justify-center flex-col sm:flex-row '>
						<CartItem cartItems={data.cartItems} cartQuantity={cartQuantity || 0} />
						<CartDetails totalAmount={data.totalAmount} isLoading={isLoading} onPurchase={onPurchase} />
					</div>
				</section>
			)}
		</>
	);
};

export default Cart;
