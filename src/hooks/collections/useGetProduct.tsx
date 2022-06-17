import axios from '../../axios';
import { useQuery } from 'react-query';
import { Product } from '../../components/collectionsItems/CollectionsItems';

export const getProduct = async (id: any) => {
	const response = await axios.get(`/products/${id}`);
	if (response.data.statusCode === 200) return response.data.product as Product;
};

const useGetProduct = (id: any) => {
	return useQuery(['products', id], () => getProduct(id));
};

export default useGetProduct;
