import { Product } from '../components/collectionsItems/CollectionsItems';

const sortProducts = (products: Product[], sortBy: string) => {
	switch (sortBy) {
		case 'priceLowToHigh':
			return products.sort((a: Product, b: Product) => a.amount - b.amount);
		case 'priceHighToLow':
			return products.sort((a: Product, b: Product) => b.amount - a.amount);
		case 'default':
			return getItems(products);
		default:
			return products;
	}
};

// Shuffle the items
const shuffle = (array: Product[]) => {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
};

const getItems = (products: Product[]) => {
	return shuffle(products);
};

export default sortProducts;
