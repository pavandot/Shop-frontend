import { useQueryClient } from 'react-query';

interface Props  {
	brandsSelected: string[];
	categoriesSelected: string[];
	handelBrandChange: (brand: string) => void;
	handelCategoryChange: (category: string) => void;
};
const FilterSelection = (props: Props) => {
	const queryClient = useQueryClient();
	const brands: any = queryClient.getQueryData(['Brands']);
	const categories: any = queryClient.getQueryData(['categories']);
	const { brandsSelected, categoriesSelected, handelBrandChange, handelCategoryChange } = props;

	return (
		<section className=' flex justify-between mt-2 '>
			<div>
				<h1>Brand</h1>
				<div className='space-y-2'>
					{brands.length > 0 &&
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
			</div>
			<div>
				<h1>Category</h1>
				<div className='space-y-2'>
					{categories.length > 0 &&
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
		</section>
	);
};

export default FilterSelection;
