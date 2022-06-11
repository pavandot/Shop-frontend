import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from '../components/Navbar';
import { CookiesProvider } from 'react-cookie';

const queryClient = new QueryClient();
import FilterContextComponent from '../context/FilterContext';
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<CookiesProvider>
				<QueryClientProvider client={queryClient}>
					<Navbar />
					<FilterContextComponent>
						<Component {...pageProps} />
					</FilterContextComponent>
				</QueryClientProvider>
			</CookiesProvider>
		</>
	);
}

export default MyApp;
