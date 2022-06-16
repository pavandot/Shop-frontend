import { useMutation, useQueryClient } from 'react-query';
import { CartItem } from '../../pages/collections/[pid]';
import axios from '../../axios';
interface AddTOCartProps {
	cartItem: CartItem;
	token: string;
}
const useAddToCart = () => {
	const queryClient = useQueryClient();
	const addToCart = async ({ cartItem, token }: AddTOCartProps) => {
		const config = {
			method: 'post',
			url: '/cart',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			data: cartItem,
		};
		await axios(config);
	};
	return useMutation(addToCart, {
		onSuccess: async () => {
			await queryClient.cancelQueries('cartQuantity');

			const previousCartQuantity: number | undefined = queryClient.getQueryData('cartQuantity');
			if (previousCartQuantity) queryClient.setQueryData('cartQuantity', previousCartQuantity + 1);
			queryClient.invalidateQueries('cartQuantity');
		},
	});
};

export default useAddToCart;
