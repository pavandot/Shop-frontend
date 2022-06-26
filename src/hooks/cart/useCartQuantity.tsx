import { useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../../context/AuthContext';
import axios from '../../axios';
const useCartQuantity = () => {
	const { token } = useContext(AuthContext);
	const getCartQuantity = async () => {
		var config = {
			method: 'get',
			url: '/cart/quantity',
			headers: {
				Authorization: 'Bearer ' + token,
			},
		};
		const response = await axios(config);
		const cartQuantity: number = response.data.totalQuantity;
		return cartQuantity;
	};
	return useQuery(['cartQuantity'], getCartQuantity, {
		enabled: token !== null,
	});
};

export default useCartQuantity;
