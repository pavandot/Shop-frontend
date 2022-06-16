import useGetCartItems from '../hooks/useGetCartItems';

const Cart = () => {
	const { data, isSuccess } = useGetCartItems();
	if (isSuccess) console.log(data);

	return <div>cart</div>;
};

export default Cart;
