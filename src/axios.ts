import axios from 'axios';

const PRODUCTION_URL = 'https://pavan-shop.herokuapp.com';
const DEVELOPMENT_URL = 'http://localhost:5000';
const instance = axios.create({
	baseURL: PRODUCTION_URL,
});

export default instance;
