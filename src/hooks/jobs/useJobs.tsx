import { UnknownAction } from '@reduxjs/toolkit';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchJobs,
	selectJobStatus,
	selectJobs,
	selectJobsError,
	selectTotalJobs,
} from '../../features/jobs/jobsSlice';

const useJobs = () => {
	const LIMIT = 10;
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();
	const jobs = useSelector(selectJobs);
	const totalJobs = useSelector(selectTotalJobs);
	const status = useSelector(selectJobStatus);
	const error = useSelector(selectJobsError);

	const TOTAL_PAGES = Math.ceil(totalJobs / LIMIT);

	const isLoading = status === 'pending';
	const isError = status === 'failed';

	const OFFSET = (page - 1) * LIMIT;

	const fetchMoreJobs = useCallback(() => {
		setPage((page) => (page < TOTAL_PAGES ? page + 1 : page));
	}, [TOTAL_PAGES]);

	useEffect(() => {
		dispatch(
			fetchJobs({ limit: LIMIT, offset: OFFSET }) as unknown as UnknownAction,
		);
	}, [dispatch, OFFSET]);

	return {
		jobs,
		isLoading,
		isError,
		error,
		fetchMoreJobs,
	};
};

export default useJobs;
