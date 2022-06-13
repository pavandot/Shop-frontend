import { RadioGroup } from '@headlessui/react';
import { useContext } from 'react';
import { sortContext } from '../../context/SortContext';
import RadioButton from './RadioButton';

interface Props  {
	closeSortModal: () => void;
};
const SortRadio = (props: Props) => {
	const { sort, setSort } = useContext(sortContext);
	const { closeSortModal } = props;
	return (
		<RadioGroup value={sort} onChange={setSort}>
			<RadioGroup.Label className='sr-only'>Default</RadioGroup.Label>
			<RadioGroup.Option value='default'>
				{({ checked }) => (
					<div className='flex items-center mt-3 space-x-2 ' onClick={() => closeSortModal()}>
						<RadioButton checked={checked} />
						<p>Default</p>
					</div>
				)}
			</RadioGroup.Option>
			<RadioGroup.Option value='priceHighToLow'>
				{({ checked }) => (
					<div className='flex items-center mt-3 space-x-2 ' onClick={() => closeSortModal()}>
						<RadioButton checked={checked} />
						<p>Price: High to Low</p>
					</div>
				)}
			</RadioGroup.Option>
			<RadioGroup.Option value='priceLowToHigh'>
				{({ checked }) => (
					<div className='flex items-center mt-3 space-x-2 ' onClick={() => closeSortModal()}>
						<RadioButton checked={checked} />
						<p>Price: Low to High</p>
					</div>
				)}
			</RadioGroup.Option>
		</RadioGroup>
	);
};

export default SortRadio;
