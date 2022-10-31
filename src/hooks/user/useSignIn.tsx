import { useCookies } from 'react-cookie';
import { useMutation } from 'react-query';
import axios from '../../axios';
const useSignIn = () => {
	const [cookies, setCookie, removeCookie] = useCookies();
	const SignIn = async (data: { email: string; password: string }) => {
		const config = {
			method: 'post',
			url: '/user/login',
			headers: {
				'Content-Type': 'application/json',
			},
			data: data,
		};
		const response = await axios(config);
		if (response.data.statusCode === 200) {
			// expires in 3 day
			const user = {
				userName: response.data.userName,
				email: response.data.email,
				token: response.data.token,
			};
			removeCookie('user');
			setCookie('user', user, { path: '/', maxAge: 86400 * 30 }); // 30 days
		}
	};
	return useMutation(SignIn);
};

export default useSignIn;
