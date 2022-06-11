import { useState, Fragment } from 'react';
import { SortIcon, FilterIcon } from '../../assets/icons';
import useGetBrands from '../../hooks/useGetBrands';
import useGetCategories from '../../hooks/useGetCategories';
import ErrorModal from '../ErrorModal';
import FilterModal from './FilterModal';
import SortModal from './SortModal';
const CollectionsFilter = () => {
	const [isSortOpen, setIsSort] = useState(false);
	const [isFilterOpen, setIsFilter] = useState(false);
	const categories = useGetCategories();
	const brands = useGetBrands();
	const closeSortModal = () => {
		setIsSort(false);
	};
	const closeFilterModal = () => {
		setIsFilter(false);
	};
	if (categories.isError || brands.isError) {
		return <ErrorModal message='Something went wrong' open={true} />;
	}
	return (
		<section className='sm:hidden'>
			<div className='bg-white py-5 px-5 flex justify-between'>
				<p className=' text-black font-semibold text-lg'>Collections</p>
				<div className='flex space-x-5'>
					<div onClick={() => setIsSort(true)}>
						<SortIcon />
					</div>
					<div onClick={() => setIsFilter(true)}>
						<FilterIcon />
					</div>
				</div>
			</div>
			<SortModal closeSortModal={closeSortModal} isSortOpen={isSortOpen} />
			<FilterModal closeFilterModal={closeFilterModal} isFilterOpen={isFilterOpen} />
		</section>
	);
};

export default CollectionsFilter;
