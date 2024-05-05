import api from '../lib/axios';
import { JobFetchAPIResponse, PaginationArgs } from '../types';

export const fetchJobs = async (args: PaginationArgs) => {
	try {
		const res = await api.post('/adhoc/getSampleJdJSON', args);
		return res as unknown as JobFetchAPIResponse;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		const message =
			error?.response?.message ||
			error?.message ||
			'Something went wrong. Please try again later.';
		return Promise.reject(message);
	}
};
