import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchJobs as fetchJobsAPI } from '../../api/jobs';
import { JobDetails, JobFetchAPIResponse } from '../../types';

interface JobsState {
	data: JobDetails[];
	total: number;
	status: 'idle' | 'pending' | 'succeeded' | 'failed';
	error: string | null;
}

const initialState: JobsState = {
	data: [],
	total: 0,
	status: 'idle',
	error: null,
};

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', fetchJobsAPI);

const jobsSlice = createSlice({
	name: 'jobs',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchJobs.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(fetchJobs.fulfilled, (state, action) => {
				state.status = 'succeeded';

				const { jdList, totalCount } =
					action.payload as unknown as JobFetchAPIResponse;
				const offset = action.meta.arg?.offset;

				state.data = offset === 0 ? jdList : state.data.concat(jdList);
				state.total = totalCount;
			})
			.addCase(fetchJobs.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message ?? 'An error occurred.';
			});
	},
});

export const jobsActions = jobsSlice.actions;

export default jobsSlice.reducer;

export const selectJobs = (state: { jobs: JobsState }) => state.jobs.data;

export const selectTotalJobs = (state: { jobs: JobsState }) => state.jobs.total;

export const selectJobStatus = (state: { jobs: JobsState }) =>
	state.jobs.status;

export const selectJobsError = (state: { jobs: JobsState }) => state.jobs.error;
