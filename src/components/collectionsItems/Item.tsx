import Image from 'next/image';
import Link from 'next/link';
import { getFormattedCurrency } from '../../utils/getFormattedCurrency';
import { Product } from './CollectionsItems';

interface Props {
	products: Product[];
}

const Item = (props: Props) => {
	const { products } = props;
	return (
		<>
			{products &&
				products.map((product: Product, index) => {
					const { _id, imageURL, brand, category, name, amount } = product;
					const formattedAmount = getFormattedCurrency(amount);
					return (
						<Link href={`/collections/${_id}`} key={_id}>
							<a className=' border-[1px] shadow overflow-hidden rounded text-sm w-full '>
								<Image src={imageURL} alt={name} width={220} height={275} layout='responsive' priority={index < 8} />
								<div className=' p-2 space-y-1 flex-col flex justify-between    '>
									<p>{brand}</p>
									<p className=' text-gray-400'>{name}</p>
									<p>Rs.{formattedAmount}</p>
								</div>
							</a>
						</Link>
					);
				})}
		</>
	);
};

export default Item;
