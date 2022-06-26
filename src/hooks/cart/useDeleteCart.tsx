import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AuthContext } from '../../context/AuthContext';
import axios from '../../axios';

const useDeleteCart = () => {
	const queryClint = useQueryClient();
	const { token } = useContext(AuthContext);
	const deleteCart = async () => {
		const config = {
			method: 'DELETE',
			url: `/cart`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		await axios(config);
	};
	return useMutation(deleteCart, {
		onSuccess: () => {
			queryClint.invalidateQueries('cart');
			queryClint.invalidateQueries('cartQuantity');
		},
	});
};

export default useDeleteCart;
