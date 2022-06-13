import { createContext, ReactNode, FunctionComponent, useState } from 'react';

interface Props  {
	children: ReactNode;
};
interface SortContextProps  {
	sort: string;
	setSort: (sort: string) => void;
};

export const sortContext = createContext({} as SortContextProps);

const SortContext: FunctionComponent<Props> = ({ children }) => {
	const [sort, setSort] = useState('default');
	console.log(sort);

	return <sortContext.Provider value={{ setSort, sort }}>{children}</sortContext.Provider>;
};

export default SortContext;
