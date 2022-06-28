import { useContext } from 'react';
import { useQuery } from 'react-query';
import axios from '../../axios';
import { AuthContext } from '../../context/AuthContext';
interface Product {
	_id: string;
	imageURL: string;
	brand: string;
	category: string;
	name: string;
	amount: number;
}
export interface WishlistInterface {
	_id: string;
	user: string;
	product: Product;
}

const useGetWishlist = () => {
	const { token } = useContext(AuthContext);
	const getWishlist = async (token: string | null) => {
		var config = {
			method: 'get',
			url: '/wishlist',
			headers: {
				Authorization: 'Bearer ' + token,
			},
		};

		const response = await axios(config);

		return response.data?.wishlistItems as WishlistInterface[];
	};
	return useQuery('wishlist', () => getWishlist(token), {
		enabled: token !== null,
	});
};

export default useGetWishlist;
