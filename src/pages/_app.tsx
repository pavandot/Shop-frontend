import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from '../components/Navbar';
import { CookiesProvider } from 'react-cookie';

const queryClient = new QueryClient();
import FilterContextComponent from '../context/FilterContext';
import SortContext from '../context/SortContext';
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<CookiesProvider>
				<QueryClientProvider client={queryClient}>
					<Navbar />
					<FilterContextComponent>
						<SortContext>
							<Component {...pageProps} />
						</SortContext>
					</FilterContextComponent>
				</QueryClientProvider>
			</CookiesProvider>
		</>
	);
}

export default MyApp;
