import { Fragment } from 'react/jsx-runtime';

import Box from '@mui/material/Box';
import { CenteredLoader } from '../../ui/loader';
import InfiniteScroll from '../../util/InfiniteScroll';
import JobCard from '../job-card';

import useJobs from '../../../hooks/jobs/useJobs';

import Typography from '@mui/material/Typography';
import styles from './JobFeed.module.css';

const BoxCenter = ({ children }: { children: React.ReactNode }) => (
	<Box
		display={'flex'}
		flexDirection='row'
		justifyContent='center'
		width={'100%'}
	>
		{children}
	</Box>
);

const NoJobs = () => (
	<BoxCenter>
		<Typography color='InfoText' variant='h6'>
			No jobs Found
		</Typography>
	</BoxCenter>
);

const Error = ({ message }: { message: string }) => (
	<BoxCenter>
		<Typography color='error' variant='h6'>
			{message}
		</Typography>
	</BoxCenter>
);

const JobFeed = () => {
	const { jobs, fetchMoreJobs, isLoading, isError, error } = useJobs();

	return (
		<Fragment>
			{isError && (
				<Error
					message={error ?? 'Something went wrong. Please try again later.'}
				/>
			)}
			{isLoading && jobs?.length === 0 && <CenteredLoader />}
			{!isError && jobs.length === 0 && !isLoading && <NoJobs />}
			<Box className={styles['job-feed']}>
				{jobs?.map((job) => (
					<JobCard key={job.jdUid} job={job} />
				))}
			</Box>
			{jobs.length > 0 && <InfiniteScroll onIntersection={fetchMoreJobs} />}
			{isLoading && jobs.length > 0 && <CenteredLoader />}
		</Fragment>
	);
};

export default JobFeed;
