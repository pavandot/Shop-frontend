import { useContext, useEffect, useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import CollectionsFilter from '../../components/collectionsFilter/CollectionsFilter';
import CollectionsItems, { Product } from '../../components/collectionsItems/CollectionsItems';
import Loading from '../../components/Loading';
import PriceListBox from '../../components/collectionsItems/PriceListBox';
import SideFilter from '../../components/collectionsItems/SideFilter';
import { FilterContext } from '../../context/FilterContext';
import { sortContext } from '../../context/SortContext';
import { getBrands } from '../../hooks/collections/useGetBrands';
import { getCategories } from '../../hooks/collections/useGetCategories';
import useGetProducts, { getProducts } from '../../hooks/collections/useGetProducts';
import filterProducts from '../../utils/filterProducts';
import sortProducts from '../../utils/sortProducts';

const Collections = () => {
	const products = useGetProducts();
	const [sortedData, setSortedData] = useState<Product[]>();
	const { brandsSelected, categoriesSelected } = useContext(FilterContext);
	const { sort } = useContext(sortContext);
	useEffect(() => {
		if (products.data) {
			let data = filterProducts(brandsSelected, categoriesSelected, products.data);
			data = sortProducts(data, sort);
			setSortedData([...data]);
		}
	}, [brandsSelected, categoriesSelected, products.data, sort]);
	if (products.isLoading) {
		return <Loading />;
	}
	return (
		<section className='max-w-[1440px]  px-2 sm:px-5 2xl:px-0 mx-auto'>
			<CollectionsFilter />

			<section className=' flex justify-end  ml-auto'>
				<SideFilter />
				<div className=' w-full sm:w-[70%] md:w-[80%] lg:w-[85%] '>
					<PriceListBox />
					{sortedData && <CollectionsItems products={sortedData} />}
				</div>
			</section>
		</section>
	);
};

export async function getStaticProps() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery('products', getProducts);
	await queryClient.prefetchQuery('Brands', getBrands);
	await queryClient.prefetchQuery('categories', getCategories);
	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
		revalidate: 30,
	};
}

export default Collections;
