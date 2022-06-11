import { Product } from '../components/collectionsItems/CollectionsItems';

type Props = {
	brandSelected: string[];
	categorySelected: string[];
	products: Product[];
};
const filterProducts = (brandSelected: string[], categorySelected: string[], products: Product[]) => {
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
	// console.log(filteredProducts);

	return filteredProducts;
};
export default filterProducts;
