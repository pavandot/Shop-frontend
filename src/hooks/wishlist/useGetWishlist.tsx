import { useContext } from 'react';
import { useQuery } from 'react-query';
import axios from '../../axios';
import { AuthContext } from '../../context/AuthContext';
const useGetWishlist = () => {
	const { token } = useContext(AuthContext);
	const getWishlist = async (token: string | null) => {
		var config = {
			method: 'get',
			url: 'http://localhost:5000/wishlist',
			headers: {
				Authorization: 'Bearer ' + token,
			},
		};

		const response = await axios(config);

		return response.data?.wishlistItems;
	};
	return useQuery('wishlist', () => getWishlist(token), {
		enabled: token !== null,
	});
};

export default useGetWishlist;
