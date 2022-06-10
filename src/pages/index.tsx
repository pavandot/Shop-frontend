import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
	return (
		<section className=' min-h-[80vh]  max-w-[1440px] mx-auto px-2 sm:px-5 2xl:px-0 flex justify-center items-center  '>
			<div className=' flex flex-col text-center space-y-6 md:space-y-8 justify-between items-center  '>
				<h1 className=' font-semibold text-black text-5xl sm:text-6xl'>Wear better, look better.</h1>
				<p className=' text-black'>Don&apos;t you just love being in apparel?</p>
				<Link href='collections'>
					<span className=' cursor-pointer px-10 rounded-md font-medium shadow text-white bg-gradient-to-r from-secondary to-primary py-3'>
						Shop Now
					</span>
				</Link>
			</div>
		</section>
	);
};

export default Home;
