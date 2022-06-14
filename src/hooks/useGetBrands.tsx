import { useQuery } from 'react-query';
import axios from '../axios';
export const getBrands = async () => {
	const response = await axios.get('/brands');

	if (response.data.statusCode === 200) return response.data.brands;
};
const useGetBrands = () => {
	return useQuery('Brands', getBrands, {
		refetchOnWindowFocus: false,
		retry: false,
	});
};

export default useGetBrands;
