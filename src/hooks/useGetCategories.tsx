import { useQuery } from 'react-query';
import axios from '../axios';
const useGetCategories = () => {
	const getCategories = async () => {
		const response = await axios.get('/categories');

		if (response.data.statusCode === 200) return response.data.categories;
	};
	return useQuery('categories', getCategories, {
		refetchOnWindowFocus: false,
		retry: false,
	});
};

export default useGetCategories;
