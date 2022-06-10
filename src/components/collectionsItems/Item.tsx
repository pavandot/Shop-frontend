import { LazyLoadImage, ScrollPosition, trackWindowScroll } from 'react-lazy-load-image-component';
import { getFormattedCurrency } from '../../utils/getFormattedCurrency';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Product } from './CollectionsItems';
import { useState } from 'react';
type Props = {
	products: Product[];
	scrollPosition: ScrollPosition;
};
const Placeholder = () => {
	return <div className='bg-gray-300  h-[100px] w-full'>lol</div>;
};

const Item = (props: Props) => {
	const { products, scrollPosition } = props;
	const [isVisible, setIsVisible] = useState(true);

	return (
		<>
			{products &&
				products.map((product: Product) => {
					const { _id, imageURL, brand, category, name, amount } = product;
					const formattedAmount = getFormattedCurrency(amount);
					return (
						<div key={_id} className=' border-[1px] rounded text-sm w-full '>
							<div className=' grid grid-rows-[1fr_100px] h-full  '>
								{/* {isVisible && <div className='bg-gray-300  h-[400px] w-full'></div>} */}
								<img
									src={imageURL}
									alt={name}
									className={` ${isVisible ? 'h-[400px]' : 'h-full'} bg-gray-400 w-full`}
									loading='lazy'
									onLoad={() => {
										setIsVisible(false);
									}}
								/>
								{/* <div className=' h-[1fr]'>
									<LazyLoadImage
										alt={name}
										src={imageURL}
										scrollPosition={scrollPosition}
										className=' w-full h-full object-cover'
										placeholder={<Placeholder />}
									/>
								</div> */}
								<div className=' p-2 space-y-1 flex-col flex justify-between bg-gray-200   '>
									<p>{brand}</p>
									<p className=' text-gray-400'>{name}</p>
									<p>Rs.{formattedAmount}</p>
								</div>
							</div>
						</div>
					);
				})}
		</>
	);
};

export default trackWindowScroll(Item);
