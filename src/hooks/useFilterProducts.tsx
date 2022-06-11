import { useQueryClient } from 'react-query';

import { Product } from '../components/collectionsItems/CollectionsItems';

type Props = {
	brandSelected: string[];
	categorySelected: string[];
};

const useFilterProducts = ({ brandSelected, categorySelected }: Props) => {
	const queryClient = useQueryClient();
	const products: Product[] | undefined = queryClient.getQueryData(['products']);
	let filteredProducts: Product[] = [];
	if (products) {
		if (brandSelected.length > 0 && categorySelected.length > 0) {
			filteredProducts = products.filter((clothe) => {
				return brandSelected.includes(clothe.brand) && categorySelected.includes(clothe.category);
			});
		} else if (brandSelected.length > 0 && categorySelected.length === 0) {
			filteredProducts = products.filter((clothe) => {
				return brandSelected.includes(clothe.brand);
			});
		} else if (brandSelected.length === 0 && categorySelected.length > 0) {
			filteredProducts = products.filter((clothe) => {
				return categorySelected.includes(clothe.category);
			});
		} else {
			filteredProducts = products;
		}
	}
	// queryClient.setQueryData(['products'], filteredProducts);
	return filteredProducts;
};

export default useFilterProducts;
