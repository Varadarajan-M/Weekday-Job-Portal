import api from '../lib/axios';
import { JobFetchAPIResponse, PaginationArgs } from '../types';

export const fetchJobs = async (args: PaginationArgs) => {
	try {
		const res = await api.post('/adhoc/getSampleJdJSON', args);
		return res as unknown as JobFetchAPIResponse;
	} catch (error) {
		return error;
	}
};
