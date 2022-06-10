import React from 'react';
import { LogoIcon } from '../assets/icons';
const Loading = () => {
	return (
		<section className=' w-full h-[80vh] flex justify-center items-center'>
			<div className=' animate-bounce'>
				<LogoIcon />
			</div>
		</section>
	);
};

export default Loading;
