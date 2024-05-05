import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchJobs as fetchJobsAPI } from '../../api/jobs';
import { JobDetails, JobFetchAPIResponse } from '../../types';
import {
	checkLocationMatch,
	checkMinExpMatch,
	checkMinSalaryMatch,
	checkRoleMatch,
	getNonEmptyFilters,
} from './utils';

type JobFilter = Partial<keyof JobDetails> & { search?: string };

interface JobsState {
	data: JobDetails[];
	sourceData: JobDetails[];
	total: number;
	status: 'idle' | 'pending' | 'succeeded' | 'failed';
	error: string | null;
	filters: Record<keyof JobFilter, string[]>;
}

const initialState: JobsState = {
	data: [],
	sourceData: [],
	total: 0,
	status: 'idle',
	error: null,
	filters: {} as JobsState['filters'],
};

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', fetchJobsAPI);

const jobsSlice = createSlice({
	name: 'jobs',
	initialState,
	reducers: {
		applyFilter(state) {
			const nonEmptyFilters = getNonEmptyFilters(
				state.filters as Record<string, string[]>,
			);

			if (!nonEmptyFilters?.length) {
				state.data = state.sourceData;
				return;
			}

			const filteredJobs: JobDetails[] = [];

			const pushIfNotPresent = (job: JobDetails) => {
				if (filteredJobs?.find((j) => j?.jdUid === job?.jdUid)) return;
				filteredJobs.push(job);
			};

			for (const job of state?.sourceData || []) {
				const filters = Object.fromEntries(nonEmptyFilters) as Record<
					keyof JobDetails,
					string[]
				>;
				const locationMatch = checkLocationMatch(job, filters);
				const minExpMatch = checkMinExpMatch(job, filters);
				const roleMatch = checkRoleMatch(job, filters);
				const minSalaryMatch = checkMinSalaryMatch(job, filters);
				const searchMatch = job.companyName
					?.toLowerCase()
					.includes(state.filters.search?.[0]?.toLowerCase() || '');

				if (
					minExpMatch &&
					locationMatch &&
					roleMatch &&
					minSalaryMatch &&
					searchMatch
				) {
					pushIfNotPresent(job);
				}
			}

			state.data = filteredJobs;
		},
		setJobFilter(state, action) {
			const { filterName, value } = action.payload;
			if (filterName) state.filters[filterName as keyof JobFilter] = value;
			jobsSlice.caseReducers.applyFilter(state);
		},
	},
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

				const newList = offset === 0 ? jdList : state.sourceData.concat(jdList);

				state.data = newList;
				state.sourceData = newList;
				state.total = totalCount;

				jobsSlice.caseReducers.applyFilter(state);
			})
			.addCase(fetchJobs.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message ?? 'An error occurred.';
			});
	},
});

export const { setJobFilter } = jobsSlice.actions;

export default jobsSlice.reducer;

export const selectJobs = (state: { jobs: JobsState }) => state.jobs.data;

export const selectTotalJobs = (state: { jobs: JobsState }) => state.jobs.total;

export const selectJobStatus = (state: { jobs: JobsState }) =>
	state.jobs.status;

export const selectJobsError = (state: { jobs: JobsState }) => state.jobs.error;
