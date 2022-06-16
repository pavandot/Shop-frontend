import { useMutation } from 'react-query';
import { CartItem } from '../pages/collections/[pid]';
import axios from '../axios';
interface AddTOCartProps {
	cartItem: CartItem;
	token: string;
}
const useAddToCart = () => {
	const addToCart = async ({ cartItem, token }: AddTOCartProps) => {
		const config = {
			method: 'post',
			url: 'cart/',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			data: cartItem,
		};
		await axios(config);
	};
	return useMutation(addToCart);
};

export default useAddToCart;
