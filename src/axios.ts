import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://pavan-shop.herokuapp.com/',
});

export default instance;
