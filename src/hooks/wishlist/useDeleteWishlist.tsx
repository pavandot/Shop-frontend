import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../../axios';
import { AuthContext } from '../../context/AuthContext';
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
		onSuccess: () => {
			queryClient.invalidateQueries('wishlist');
		},
	});
};

export default useDeleteWishlist;
