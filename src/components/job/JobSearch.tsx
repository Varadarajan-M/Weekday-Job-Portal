import JobFeed from './job-feed';
import JobFilters from './job-filters';

import styles from './JobSearch.module.css';

const JobSearch = () => {
	return (
		<section className={styles['job-search']}>
			<JobFilters />
			<JobFeed />
		</section>
	);
};

export default JobSearch;
