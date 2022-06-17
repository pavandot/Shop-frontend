import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogoIcon } from '../assets/icons';
import Spinner from '../components/Spinner';
import useSignUp from '../hooks/user/useSignUp';
import { useRouter } from 'next/router';
const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [error, setError] = useState({
		emailMessage: '',
		passwordMessage: '',
		nameMessage: '',
		responseError: false,
	});
	const router = useRouter();
	const { mutate, isError, isLoading, isSuccess, error: apiError }: any = useSignUp();
	useEffect(() => {
		if (isSuccess) {
			router.push('/');
		}
		if (isError) {
			setError({
				...error,
				responseError: true,
			});
		}
	}, [error, isError, isSuccess, router]);

	const handelSubmit = (e: any) => {
		e.preventDefault();
		// Check if name is empty
		if (name === '') setError({ ...error, nameMessage: 'Name is required' });
		// Check if email is empty
		if (email === '') setError({ ...error, emailMessage: 'Email is required' });
		// Check if password is empty
		if (password === '') setError({ ...error, passwordMessage: 'Password is required' });
		// Check if email is valid
		if (email !== '' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) setError({ ...error, emailMessage: 'Invalid email' });
		// Check if password is valid
		if (password !== '' && password.length < 6) setError({ ...error, passwordMessage: 'Password must be at least 6 characters' });
		// Check if email and password are valid
		if (email !== '' && password !== '' && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) && password.length >= 6) {
			const data = {
				userName: name,
				email,
				password,
			};
			mutate(data);
		}
	};
	return (
		<section className=' max-w-7xl mx-auto flex justify-center min-h-[75vh] items-center'>
			<div className=' max-w-lg w-full  rounded-md border-[1px] shadow p-8'>
				<div className='flex justify-center pb-8  '>
					<div className='drop-shadow-md'>
						<LogoIcon />
					</div>
				</div>
				{error.responseError && (
					<div className='p-2 border-[1px] border-red-500 rounded-md mb-5 text-center text-red-500'>
						{apiError?.response?.data?.message || 'Something went wrong'}
					</div>
				)}
				<form className=' flex justify-center flex-col items-center space-y-5' onSubmit={handelSubmit}>
					<div className=' w-full'>
						<input
							type='text'
							className=' border-[1px] border-gray-400 outline-none focus:border-primary rounded-md p-3 w-full'
							placeholder='Name'
							value={name}
							onChange={(e) => {
								setName(e.target.value);
								setError({ ...error, nameMessage: '', responseError: false });
							}}
						/>
						{error.nameMessage && <p className=' text-sm pl-2 pt-1 text-red-500'>{error.nameMessage}</p>}
					</div>
					<div className=' w-full'>
						<input
							type='Email'
							className=' border-[1px] border-gray-400 outline-none focus:border-primary rounded-md p-3 w-full'
							placeholder='Email'
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
								setError({ ...error, emailMessage: '', responseError: false });
							}}
						/>
						{error.emailMessage && <p className=' text-sm pl-2 pt-1 text-red-500'>{error.emailMessage}</p>}
					</div>
					<div className=' w-full'>
						<input
							type='Password'
							className=' border-[1px] border-gray-400 focus:border-primary outline-none rounded-md p-3 w-full'
							placeholder='Password'
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								setError({ ...error, passwordMessage: '', responseError: false });
							}}
						/>
						{error.passwordMessage && <p className=' text-sm pl-2 pt-1 text-red-500'>{error.passwordMessage}</p>}
					</div>
					<button
						type='submit'
						className=' w-full py-3 bg-gradient-to-r text-center flex justify-center items-center from-secondary hover:from-primary to-primary hover:to-secondary rounded-md text-white font-medium'
					>
						{isLoading ? <Spinner /> : 'Sign Up'}
					</button>
				</form>
				<div className=' pt-10 text-center space-y-3 text-sm'>
					<div className='flex justify-center space-x-1 '>
						<span>Do you have an account?</span>
						<Link href='/signin'>
							<a className=' text-primary hover:underline'>Sign In</a>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SignUp;
