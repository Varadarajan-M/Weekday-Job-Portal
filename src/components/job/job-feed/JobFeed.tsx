import { Fragment } from 'react/jsx-runtime';

import Box from '@mui/material/Box';
import { CenteredLoader } from '../../ui/loader';
import InfiniteScroll from '../../util/InfiniteScroll';
import JobCard from '../job-card';

import useJobs from '../../../hooks/jobs/useJobs';

import styles from './JobFeed.module.css';

const JobFeed = () => {
	const { jobs, fetchMoreJobs, isLoading } = useJobs();

	return (
		<Fragment>
			{isLoading && jobs?.length === 0 && <CenteredLoader />}
			<Box className={styles['job-feed']}>
				{jobs.map((job) => (
					<JobCard key={job.jdUid} job={job} />
				))}
				<InfiniteScroll onIntersection={fetchMoreJobs} />
			</Box>
			{isLoading && jobs.length > 0 && <CenteredLoader />}
		</Fragment>
	);
};

export default JobFeed;
