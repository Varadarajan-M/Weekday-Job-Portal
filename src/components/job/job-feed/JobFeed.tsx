import { Box } from '@mui/material';

import JobCard from '../job-card';

import { jobs } from '../../../data';
import styles from './JobFeed.module.css';

const JobFeed = () => {
	return (
		<Box className={styles['job-feed']}>
			{jobs.map((job) => (
				<JobCard key={job.jdUid} job={job} />
			))}
		</Box>
	);
};

export default JobFeed;
