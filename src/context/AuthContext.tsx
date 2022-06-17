import { createContext, FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

interface Props {
	children: ReactNode;
}
interface User {
	email: string;
	token: string;
	userName: string;
}

interface AuthContextProps {
	isAuthenticated: boolean;
	user: User | null;
	token: string | null;
}

export const AuthContext = createContext({} as AuthContextProps);

const AuthContextProvider: FunctionComponent<Props> = ({ children }) => {
	const [cookie, setCookie, removeCookie] = useCookies(['user']);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		if (cookie.user) {
			setIsAuthenticated(true);
			setUser(cookie.user);
			setToken(cookie.user.token);
		}
	}, [cookie.user]);

	return <AuthContext.Provider value={{ isAuthenticated, user, token }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
