import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../../axios';
import { AuthContext } from '../../context/AuthContext';
import { WishlistInterface } from './useGetWishlist';
const useDeleteWishlist = () => {
	const { token } = useContext(AuthContext);
	const queryClient = useQueryClient();
	const deleteWishlist = async (product: string) => {
		var config = {
			method: 'delete',
			url: `wishlist/${product}`,
			headers: {
				Authorization: 'Bearer ' + token,
			},
		};

		const response = await axios(config);
		return response.data;
	};
	return useMutation(deleteWishlist, {
		onMutate: (data) => {
			queryClient.cancelQueries(['wishlist']);
			const wishlist: WishlistInterface[] | undefined = queryClient.getQueryData('wishlist');

			if (wishlist) {
				const newWishlist = wishlist.filter((item) => item._id !== data);
				queryClient.setQueryData('wishlist', newWishlist);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries('wishlist');
		},
	});
};

export default useDeleteWishlist;
