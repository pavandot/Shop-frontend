import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AuthContext } from '../../context/AuthContext';
import axios from '../../axios';
import { CartItem } from '../../pages/cart';
const useDeletedCartItem = () => {
	const queryClient = useQueryClient();
	const { token } = useContext(AuthContext);
	const deleteCartItem = async (id: string) => {
		var config = {
			method: 'delete',
			url: `/cart/${id}`,
			headers: {
				Authorization: 'Bearer ' + token,
			},
		};
		await axios(config);
	};
	return useMutation(deleteCartItem, {
		onMutate: async (id: string) => {
			await queryClient.cancelQueries('cart');
			await queryClient.cancelQueries('cartQuantity');
			const previousCartItems: CartItem[] | undefined = queryClient.getQueryData('cart');
			const previousCartQuantity: number | undefined = queryClient.getQueryData('cartQuantity');
			if (previousCartItems) {
				const newCartItems = previousCartItems.filter((item) => item._id !== id);
				queryClient.setQueryData('cart', newCartItems);
			}
			if (previousCartQuantity) queryClient.setQueryData('cartQuantity', previousCartQuantity - 1);
			return { previousCartItems, previousCartQuantity };
		},
		onError: (err, id, context) => {
			if (context) {
				queryClient.setQueryData('cart', context.previousCartItems);
				queryClient.setQueryData('cartQuantity', context.previousCartQuantity);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries('cart');
			queryClient.invalidateQueries('cartQuantity');
		},
	});
};

export default useDeletedCartItem;
