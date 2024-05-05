import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
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
