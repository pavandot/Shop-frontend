import { useMutation, useQueryClient } from 'react-query';
import { CartItem } from '../../pages/collections/[pid]';
import axios from '../../axios';
interface AddTOCartProps {
	cartItem: CartItem;
	token: string;
	wishlistId: string;
}
const useMoveToCart = () => {
	const queryClient = useQueryClient();
	const moveToCart = async ({ cartItem, token, wishlistId }: AddTOCartProps) => {
		const config = {
			method: 'post',
			url: `/wishlist/${wishlistId}`,
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			data: cartItem,
		};
		await axios(config);
	};
	return useMutation(moveToCart, {
		onSuccess: async () => {
			queryClient.invalidateQueries('cartQuantity');
			queryClient.invalidateQueries('wishlist');
			queryClient.invalidateQueries('cart');
		},
	});
};

export default useMoveToCart;
