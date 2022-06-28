import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../../axios';
import { AuthContext } from '../../context/AuthContext';
const useAddToWishlist = () => {
	const queryClient = useQueryClient();
	const { token } = useContext(AuthContext);
	const addToWishlist = async (product: string | string[]) => {
		const data = JSON.stringify({
			product,
		});

		const config = {
			method: 'post',
			url: 'wishlist',
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
			data: data,
		};

		const response = await axios(config);
		return response.data;
	};
	return useMutation(addToWishlist, {
		onSuccess: () => {
			queryClient.invalidateQueries('wishlist');
		},
	});
};

export default useAddToWishlist;
