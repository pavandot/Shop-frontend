import React from 'react';
import { getProduct } from '../../hooks/useGetProduct';
import { getProducts } from '../../hooks/useGetProducts';
import { Product } from '../../components/collectionsItems/CollectionsItems';
import { SWRConfig, unstable_serialize } from 'swr';
import ProductItem from '../../components/ProductItem';
import { useRouter } from 'next/router';

const Product = ({ fallback }: any) => {
	const router = useRouter();
	const { pid } = router.query;
	return <SWRConfig value={{ fallback }}>{pid && <ProductItem id={pid} />}</SWRConfig>;
};

export async function getStaticPaths() {
	let paths = {};
	const products = await getProducts();
	if (products) {
		paths = products.map((product: Product) => ({
			params: {
				pid: product._id,
			},
		}));
	}
	return {
		paths,
		fallback: true,
	};
}

export async function getStaticProps(context: any) {
	const id = context.params.pid;
	const product = await getProduct(id);
	return {
		props: {
			fallback: {
				[unstable_serialize(['collections', id])]: product,
			},
		},
		revalidate: 30,
	};
}

export default Product;
