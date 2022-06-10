import { Link } from 'react-router-dom';
import { LogoIcon, WishlistIcon, CartIcon, UserIcon } from '../assets/icons';
import { Menu } from '@headlessui/react';
import { useCookies } from 'react-cookie';
const Navbar = () => {
	const [cookie, setCookie, removeCookie] = useCookies(['user']);
	const user = cookie.user;
	const signOutHandler = () => {
		removeCookie('user');
	};
	return (
		<section className=' max-w-[1440px] px-2 sm:px-5 2xl:px-0 mx-auto relative '>
			<Menu>
				<div className=' w-full py-5 flex justify-between items-center'>
					<Link to='/' className=' flex space-x-3 items-center'>
						<LogoIcon />
						<p className=' font-medium text-2xl'>Shop</p>
					</Link>
					<div className='flex space-x-5 sm:space-x-6 items-center'>
						<Link to='/wishlist'>
							<div className=' relative'>
								<WishlistIcon />
								<div className='flex absolute top-[-12px] right-[-10px] justify-center items-center bg-primary w-5 text-xs text-white h-5 rounded-full'>
									<span>1</span>
								</div>
							</div>
						</Link>

						<Link to='/cart'>
							<div className=' relative'>
								<CartIcon />
								<div className='flex absolute top-[-12px] right-[-10px] justify-center items-center bg-primary w-5 text-xs text-white h-5 rounded-full'>
									<span>1</span>
								</div>
							</div>
						</Link>
						<Menu.Button>
							<UserIcon />
						</Menu.Button>
					</div>
				</div>
				<Menu.Items className='absolute border-[1px] right-0 md:right-5 2xl:right-0 p-1  w-72 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
					<div className={`px-2 pt-2 ${user ? 'pb-2' : 'pb-5'} `}>
						{user && (
							<>
								<p className=' text-black font-semibold'>Hello</p>
								<p>{user.email}</p>
							</>
						)}
						{!user && (
							<>
								<p className=' text-black font-semibold'>Welcome</p>
								<p className=' text-black mb-3'>To access wishlist or cart</p>
								<Menu.Item>
									<Link
										to='/signin'
										className=' border-[1px] px-4 hover:bg-primary hover:text-white  py-1 text-primary  rounded transition-all duration-300 border-primary '
									>
										Sign In
									</Link>
								</Menu.Item>
							</>
						)}
					</div>
					<div className='p-2'>
						<Menu.Item>
							<Link to='/collections'>Collections</Link>
						</Menu.Item>
					</div>
					<div className='p-2'>
						<Menu.Item>
							<Link to='/wishlist'>Wishlist</Link>
						</Menu.Item>
					</div>
					<div className='p-2'>
						<Menu.Item>
							<Link to='/cart'>Cart</Link>
						</Menu.Item>
					</div>
					{user && (
						<div className='p-2'>
							<Menu.Item>
								<p className=' cursor-pointer' onClick={signOutHandler}>
									Sign Out
								</p>
							</Menu.Item>
						</div>
					)}
				</Menu.Items>
			</Menu>
		</section>
	);
};

export default Navbar;
