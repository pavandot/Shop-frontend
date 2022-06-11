import { useContext } from 'react';
import CollectionsFilter from '../../components/collectionsFilter/CollectionsFilter';
import CollectionsItems from '../../components/collectionsItems/CollectionsItems';
import Loading from '../../components/Loading';
import PriceListBox from '../../components/PriceListBox';
import SideFilter from '../../components/SideFilter';
import { FilterContext } from '../../context/FilterContext';
import useGetProducts from '../../hooks/useGetProducts';
import filterProducts from '../../utils/filterProducts';

const Collections = () => {
	const products = useGetProducts();
	const { brandsSelected, categoriesSelected } = useContext(FilterContext);
	if (products.isLoading) {
		return <Loading />;
	}
	const data = filterProducts(brandsSelected, categoriesSelected, products.data);
	console.log('data', data);

	return (
		<section className='max-w-[1440px]  px-2 sm:px-5 2xl:px-0 mx-auto'>
			<CollectionsFilter />

			<section className=' flex justify-end  ml-auto'>
				<SideFilter />
				<div className=' w-full sm:w-[70%] md:w-[80%] lg:w-[85%] '>
					<PriceListBox />
					<CollectionsItems products={data} />
				</div>
			</section>
		</section>
	);
};

export default Collections;
