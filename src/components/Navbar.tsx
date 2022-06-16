import Link from 'next/link';
import { LogoIcon, WishlistIcon, CartIcon, UserIcon } from '../assets/icons';
import { Menu } from '@headlessui/react';
import { useCookies } from 'react-cookie';
import useCartQuantity from '../hooks/useCartQuantity';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
const Navbar = () => {
	const [cookie, setCookie, removeCookie] = useCookies(['user']);
	const { user, token } = useContext(AuthContext);
	const { data: cartQuantity, isSuccess: isCartQuantity } = useCartQuantity();
	const signOutHandler = () => {
		removeCookie('user');
	};
	return (
		<section className=' max-w-[1440px] px-2 sm:px-5 2xl:px-0 mx-auto relative '>
			<div className=' w-full py-5 flex justify-between items-center'>
				<Link href='/'>
					<a className=' flex space-x-3 items-center '>
						<LogoIcon />
						<p className=' font-medium text-2xl'>Shop</p>
					</a>
				</Link>
				<div className='flex space-x-5 sm:space-x-6 items-center'>
					<Link href='/wishlist'>
						<div className=' relative'>
							<WishlistIcon />
							{token && (
								<div className='flex absolute top-[-12px] right-[-10px] justify-center items-center bg-primary w-5 text-xs text-white h-5 rounded-full'>
									<span>1</span>
								</div>
							)}
						</div>
					</Link>

					<Link href='/cart'>
						<div className=' relative cursor-pointer'>
							<CartIcon />
							{token && (
								<div className='flex absolute top-[-12px] right-[-10px] justify-center items-center bg-primary w-5 text-xs text-white h-5 rounded-full'>
									<span>{isCartQuantity && cartQuantity}</span>
								</div>
							)}
						</div>
					</Link>
					<Menu>
						<Menu.Button>
							<UserIcon />
						</Menu.Button>
						<Menu.Items
							as='section'
							className='absolute z-20 border-[1px] top-20 right-0 md:right-5 2xl:right-0 p-1  w-72 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
						>
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
										<Link href='/signin'>
											<Menu.Item>
												<span
													className=' cursor-pointer border-[1px] px-4 hover:bg-primary hover:text-white py-1 text-primary rounded
										transition-all duration-300 border-primary '
												>
													Sign In
												</span>
											</Menu.Item>
										</Link>
									</>
								)}
							</div>
							<div className='p-2'>
								<Link href='/collections'>
									<a>
										<Menu.Item>
											<>Collections</>
										</Menu.Item>
									</a>
								</Link>
							</div>
							<div className='p-2'>
								<Link href='/wishlist'>
									<a>
										<Menu.Item>
											<>Wishlist</>
										</Menu.Item>
									</a>
								</Link>
							</div>
							<div className='p-2'>
								<Link href='/cart'>
									<a>
										<Menu.Item>
											<>Cart</>
										</Menu.Item>
									</a>
								</Link>
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
				</div>
			</div>
		</section>
	);
};

export default Navbar;
