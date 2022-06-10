import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LogoIcon } from '../assets/icons';
import Spinner from '../components/Spinner';
import useSignIn from '../hooks/useSignIn';
const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState({
		emailMessage: '',
		passwordMessage: '',
		responseError: false,
	});
	const router = useRouter();
	const [isGuest, setIsGuest] = useState(false);
	const { mutate, isError, isLoading, isSuccess, error: apiError }: any = useSignIn();
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
				email,
				password,
			};
			mutate(data);
		}
	};
	const handelGuestUser = () => {
		const data = {
			email: 'guest@mail.com',
			password: '0850123',
		};
		mutate(data);
	};
	return (
		<section className=' max-w-7xl mx-auto flex justify-center min-h-[70vh] items-center'>
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
							required
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
						className=' w-full py-3 text-center flex justify-center items-center bg-gradient-to-r  from-secondary hover:from-primary to-primary hover:to-secondary rounded-md text-white font-medium'
					>
						{!isGuest && isLoading ? <Spinner /> : 'Sign In'}
					</button>
				</form>
				<div className=' pt-10 text-center space-y-3 text-sm'>
					<div
						className=' text-primary hover:underline justify-center  items-center flex cursor-pointer'
						onClick={() => {
							setIsGuest(true);
							handelGuestUser();
						}}
					>
						<span>Continue as Guest</span>
						{isGuest && isLoading && (
							<div className='ml-3'>
								<Spinner color='text-primary' size='h-4 w-4' />
							</div>
						)}
					</div>
					<div className='flex justify-center space-x-1 '>
						<span>Don&apos;t have an account?</span>
						<Link href='/signup'>
							<a className=' text-primary hover:underline '>Sign Up</a>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SignIn;
