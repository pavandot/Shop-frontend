import { useQuery } from 'react-query';
import axios from '../axios';
export const getProducts = async () => {
	const response = await axios.get('/products');
	if (response.data.statusCode === 200) return response.data.products;
};
const useGetProducts = () => {
	return useQuery('products', getProducts, {
		refetchOnWindowFocus: false,
	});
};

export default useGetProducts;
