import useGetProducts from '../../hooks/useGetProducts';
import Item from './Item';

// {
//     "_id": "62a0a842f9b1ba13282fcdac",
//     "imageURL": "https://firebasestorage.googleapis.com/v0/b/shop-f8c1f.appspot.com/o/White_Poplin_Shirt_680911ba-1ca9-4a5d-8c1c-5dda8dd4f00e?alt=media",
//     "brand": "American Eagle",
//     "category": "Shirts",
//     "name": "White Poplin Shirt",
//     "amount": 2590,
//     "__v": 0
// }
export type Product = {
	_id: string;
	imageURL: string;
	brand: string;
	category: string;
	name: string;
	amount: number;
	__v: number;
};

type Props = {
	products: any;
};
const CollectionsItems = ({ products }: Props) => {
	let testProducts;
	if (products.isSuccess) {
		testProducts = products.data.slice(0, 4);
		// console.log(testProducts);
	}

	return (
		<section className='grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4'>
			<Item products={products} />
		</section>
	);
};

export default CollectionsItems;
