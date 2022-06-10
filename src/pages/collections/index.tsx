import CollectionsFilter from '../../components/collectionsFilter/CollectionsFilter';
import CollectionsItems from '../../components/collectionsItems/CollectionsItems';
import Loading from '../../components/Loading';
import PriceListBox from '../../components/PriceListBox';
import SideFilter from '../../components/SideFilter';
import useGetProducts from '../../hooks/useGetProducts';

const Collections = () => {
	const products = useGetProducts();

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
					<CollectionsItems products={products} />
				</div>
			</section>
		</section>
	);
};

export default Collections;
