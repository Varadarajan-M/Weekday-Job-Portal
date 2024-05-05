import axios from 'axios';

const api = axios.create({
	baseURL: 'https://api.weekday.technology',
});

api.interceptors.response.use(
	(res) => {
		if (res?.data) {
			return res.data;
		}
	},
	(err) => {
		return Promise.reject(err);
	},
);

export default api;
