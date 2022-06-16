import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AuthContext } from '../context/AuthContext';
import axios from '../axios';
import { CartItem } from '../pages/cart';
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
			const previousCartItems: CartItem[] | undefined = queryClient.getQueryData('cart');
			if (previousCartItems) {
				const newCartItems = previousCartItems.filter((item) => item._id !== id);
				queryClient.setQueryData('cart', newCartItems);
			}
			return previousCartItems;
		},
		onError: (err, id, context) => {
			queryClient.setQueryData('cart', context);
		},
		onSettled: () => {
			queryClient.invalidateQueries('cart');
		},
	});
};

export default useDeletedCartItem;
