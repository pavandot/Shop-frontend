import { useQuery } from 'react-query';
import axios from '../../axios';
import { Product } from '../../components/collectionsItems/CollectionsItems';
export const getProducts = async () => {
	const response = await axios.get('/products');
	if (response.data.statusCode === 200) return response.data.products as Product[];
};
const useGetProducts = () => {
	return useQuery('products', getProducts, {
		refetchOnWindowFocus: false,
	});
};

export default useGetProducts;
