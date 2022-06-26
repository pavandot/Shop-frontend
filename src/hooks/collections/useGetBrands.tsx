import { useQuery } from 'react-query';
import axios from '../../axios';
interface Brand {
	_id: string;
	name: string;
}
export const getBrands = async () => {
	const response = await axios.get('/brands');

	if (response.data.statusCode === 200) return response.data.brands as Brand[];
};
const useGetBrands = () => {
	return useQuery('Brands', getBrands, {
		refetchOnWindowFocus: false,
		retry: false,
	});
};

export default useGetBrands;
