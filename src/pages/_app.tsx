import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from '../components/Navbar';
import { CookiesProvider } from 'react-cookie';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<CookiesProvider>
				<QueryClientProvider client={queryClient}>
					<Navbar />
					<Component {...pageProps} />
				</QueryClientProvider>
			</CookiesProvider>
		</>
	);
}

export default MyApp;
