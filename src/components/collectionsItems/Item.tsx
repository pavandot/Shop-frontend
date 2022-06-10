import Image from 'next/image';
import { getFormattedCurrency } from '../../utils/getFormattedCurrency';
import { Product } from './CollectionsItems';
import { useState } from 'react';

type Props = {
	products: Product[];
};

const Item = (props: Props) => {
	const { products } = props;
	const [isVisible, setIsVisible] = useState(true);

	return (
		<>
			{products &&
				products.map((product: Product, index) => {
					const { _id, imageURL, brand, category, name, amount } = product;
					const formattedAmount = getFormattedCurrency(amount);
					return (
						<div key={_id} className=' border-[1px] rounded text-sm w-full '>
							<Image src={imageURL} alt={name} width={220} height={275} layout='responsive' priority={index < 8} />
							<div className=' p-2 space-y-1 flex-col flex justify-between bg-gray-200   '>
								<p>{brand}</p>
								<p className=' text-gray-400'>{name}</p>
								<p>Rs.{formattedAmount}</p>
							</div>
						</div>
					);
				})}
		</>
	);
};

export default Item;
