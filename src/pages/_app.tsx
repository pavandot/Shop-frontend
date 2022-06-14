import { useState } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import Navbar from '../components/Navbar';
import { CookiesProvider } from 'react-cookie';

import FilterContextComponent from '../context/FilterContext';
import SortContext from '../context/SortContext';
function MyApp({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<>
			<CookiesProvider>
				<QueryClientProvider client={queryClient}>
					<Hydrate state={pageProps.dehydratedState}>
						<Navbar />
						<FilterContextComponent>
							<SortContext>
								<Component {...pageProps} />
							</SortContext>
						</FilterContextComponent>
					</Hydrate>
				</QueryClientProvider>
			</CookiesProvider>
		</>
	);
}

export default MyApp;
