import { RadioGroup } from '@headlessui/react';
import RadioButton from './RadioButton';

type Props = {
	sort: string;
	setSort: (sort: string) => void;
	closeSortModal: () => void;
};
const SortRadio = (props: Props) => {
	const { sort, setSort, closeSortModal } = props;
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
			<RadioGroup.Option value='htol'>
				{({ checked }) => (
					<div className='flex items-center mt-3 space-x-2 ' onClick={() => closeSortModal()}>
						<RadioButton checked={checked} />
						<p>Price: High to Low</p>
					</div>
				)}
			</RadioGroup.Option>
			<RadioGroup.Option value='ltoh'>
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
