import { useQuery } from 'react-query';
import axios from '../axios';
export const getCategories = async () => {
	const response = await axios.get('/categories');

	if (response.data.statusCode === 200) return response.data.categories;
};
const useGetCategories = () => {
	return useQuery('categories', getCategories, {
		refetchOnWindowFocus: false,
		retry: false,
	});
};

export default useGetCategories;
