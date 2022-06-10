import { FunctionComponent, ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
type Props = {
	children: ReactNode;
};

const PublicRoute: FunctionComponent<Props> = (props) => {
	const [cookies] = useCookies(['user']);
	const user = cookies.user;
	if (!user) return <>{props.children}</>;
	if (user) return <Navigate to='/' />;
	return <></>;
};

export default PublicRoute;
