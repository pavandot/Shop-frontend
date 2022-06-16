import axios from '../../axios';
import React from 'react';
import { useQuery } from 'react-query';
import { Product } from '../../components/collectionsItems/CollectionsItems';

interface Response {
	data: {
		statusCode: number;
		product: Product;
	};
}

export const getProduct = async (id: any) => {
	const response: Response = await axios.get(`/products/${id}`);
	if (response.data.statusCode === 200) return response.data.product;
};

const useGetProduct = (id: any) => {
	return useQuery(['products', id], () => getProduct(id));
};

export default useGetProduct;
