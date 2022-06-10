import CollectionsFilter from '../components/collectionsFilter/CollectionsFilter';
import CollectionsItems from '../components/collectionsItems/CollectionsItems';
import useGetProducts from '../hooks/useGetProducts';
import { Product } from '../components/collectionsItems/CollectionsItems';
const Collections = () => {
	const products = useGetProducts();

	if (products.isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<>
			<section>
				<CollectionsFilter />
				<CollectionsItems products={products} />
			</section>
		</>
	);
};

export default Collections;
