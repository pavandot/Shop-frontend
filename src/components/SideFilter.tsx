import React, { useContext } from 'react';
import { FilterContext } from '../context/FilterContext';
import useGetBrands from '../hooks/useGetBrands';
import useGetCategories from '../hooks/useGetCategories';

const SideFilter = () => {
	const { data: brands } = useGetBrands();
	const { data: categories } = useGetCategories();
	const { brandsSelected, categoriesSelected, handelBrandChange, handelCategoryChange } = useContext(FilterContext);

	return (
		<div className='  hidden sm:block   bg-white  w-[30%] md:w-[20%] lg:w-[15%]'>
			<p className=' text-lg font-medium pb-7'>Filters</p>
			<div>
				<h1 className=' font-semibold'>Brand</h1>
				<div className='space-y-2 mb-10'>
					{brands &&
						brands.map((brand: any) => {
							const { _id, name } = brand;
							return (
								<div className=' space-x-1 mb-2 mt-2 flex items-center' key={_id}>
									<input
										type='checkbox'
										name='brand'
										id={name}
										checked={brandsSelected.includes(name)}
										className=' accent-primary w-4 h-4'
										onChange={() => {
											handelBrandChange(name);
										}}
									/>
									<label htmlFor={name}>{name}</label>
								</div>
							);
						})}
				</div>
				<div>
					<h1 className=' font-semibold'>Category</h1>
					<div className='space-y-2'>
						{categories &&
							categories.map((category: any) => {
								const { _id, name } = category;
								return (
									<div className=' space-x-1 mb-2 mt-2 flex items-center' key={_id}>
										<input
											type='checkbox'
											name='category'
											id={name}
											checked={categoriesSelected.includes(name)}
											className=' accent-primary w-4 h-4'
											onChange={() => {
												handelCategoryChange(name);
											}}
										/>
										<label htmlFor={name}>{name}</label>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SideFilter;
