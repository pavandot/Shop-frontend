import { createContext, ReactNode, FunctionComponent, useState } from 'react';

interface Props {
	children: ReactNode;
}
type FilterContextProps = {
	brandsSelected: string[];
	categoriesSelected: string[];
	setBrandsSelected: (brandsSelected: string[]) => void;
	setCategoriesSelected: (categoriesSelected: string[]) => void;
	handelBrandChange: (brand: string) => void;
	handelCategoryChange: (category: string) => void;
};
export const FilterContext = createContext({} as FilterContextProps);

const FilterContextComponent: FunctionComponent<Props> = ({ children }) => {
	const [brandsSelected, setBrandsSelected] = useState<string[]>([]);
	const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);

	const handelBrandChange = (brand: string) => {
		if (brandsSelected.includes(brand)) {
			const newBrandsSelected = brandsSelected.filter((b) => b !== brand);

			setBrandsSelected(newBrandsSelected);
		} else {
			const newBrandsSelected = [...brandsSelected, brand];

			setBrandsSelected(newBrandsSelected);
		}
	};
	const handelCategoryChange = (category: string) => {
		if (categoriesSelected.includes(category)) {
			const newCategoriesSelected = categoriesSelected.filter((c) => c !== category);

			setCategoriesSelected(newCategoriesSelected);
		} else {
			const newCategoriesSelected = [...categoriesSelected, category];

			setCategoriesSelected(newCategoriesSelected);
		}
	};

	return (
		<FilterContext.Provider
			value={{
				brandsSelected,
				categoriesSelected,
				setBrandsSelected,
				setCategoriesSelected,
				handelBrandChange,
				handelCategoryChange,
			}}
		>
			{children}
		</FilterContext.Provider>
	);
};

export default FilterContextComponent;
