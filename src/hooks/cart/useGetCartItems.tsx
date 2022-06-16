import { useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../../context/AuthContext';
import axios from '../../axios';
import { CartItem } from '../../pages/cart';
const useGetCartItems = () => {
	const { token } = useContext(AuthContext);
	const getCartItems = async () => {
		const config = {
			method: 'get',
			url: '/cart',
			headers: {
				Authorization: 'Bearer ' + token,
			},
		};
		const response = await axios(config);
		const cartItems: CartItem[] = response.data?.cartItems;
		return cartItems;
	};
	const formatData = (data: CartItem[]) => {
		const totalAmount = data.reduce((acc, item) => {
			return acc + item.product.amount * item.quantity;
		}, 0);
		console.log(totalAmount);
		return {
			cartItems: data,
			totalAmount,
		};
	};
	return useQuery(['cart'], getCartItems, {
		select: formatData,
		enabled: token !== null,
	});
};

export default useGetCartItems;
