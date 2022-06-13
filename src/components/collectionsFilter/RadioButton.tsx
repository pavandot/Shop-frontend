interface props  {
	checked: boolean;
};
const RadioButton = ({ checked }: props) => {
	return (
		<button
			className={` w-5 h-5 border-[1px] rounded-[50%] bg-transparent flex justify-center items-center  cursor-pointer ${
				checked ? 'border-[#4a00e0] stroke-primary' : 'border-gray-500'
			}`}
		>
			<div className={`${checked && 'bg-primary'} w-3 h-3 rounded-full`}></div>
		</button>
	);
};

export default RadioButton;
