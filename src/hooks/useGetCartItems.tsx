import { useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../context/AuthContext';
import axios from '../axios';
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
		return response.data?.cartItems;
	};
	return useQuery(['cart'], getCartItems);
};

export default useGetCartItems;
