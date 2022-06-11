import { Product } from '../components/collectionsItems/CollectionsItems';

const sortProducts = (products: Product[], sortBy: string) => {
	switch (sortBy) {
		case 'priceLowToHigh':
			return products.sort((a: Product, b: Product) => a.amount - b.amount);
		case 'priceHighToLow':
			return products.sort((a: Product, b: Product) => b.amount - a.amount);
		default:
			return products.sort(() => Math.random() - 0.5);
	}
};

export default sortProducts;
