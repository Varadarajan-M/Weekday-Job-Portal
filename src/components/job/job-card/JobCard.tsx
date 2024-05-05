import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '../../ui/card';

import { JobDetails } from '../../../types';
import styles from './JobCard.module.css';

type JobCardProps = {
	job: JobDetails;
};

const getSalaryText = (
	minSalary: number,
	maxSalary: number,
	currency: string,
) => {
	if (!minSalary || !maxSalary || !currency) return '';

	const prefix = {
		INR: '₹',
		USD: '$',
	};
	const postfix = {
		INR: 'LPA',
		USD: 'K Per Annum',
	};

	return `Estimated Salary: ${
		prefix[currency as keyof typeof prefix]
	}${minSalary} - ${maxSalary} ${postfix[currency as keyof typeof postfix]}`;
};

const JobCard = ({ job }: JobCardProps) => {
	return (
		<Card className={styles['job-card']}>
			<span className={styles['job-card__time-stamp']}>
				{' '}
				⏳ Posted 10 days ago
			</span>
			<Box className={styles['job-card__company-details']}>
				<img
					src={job?.logoUrl}
					alt='company logo'
					className={styles['job-card__company-logo']}
				/>
				<Box className={styles['job-card__company-details-info']}>
					<h3 className={styles['job-card__company']}>
						{job?.companyName ?? ''}
					</h3>
					<p className={styles['job-card__position']}>{job?.jobRole ?? ''}</p>
					<p className={styles['job-card__location']}>{job?.location ?? ''}</p>
				</Box>
			</Box>
			<span className={styles['job-card__salary']}>
				{getSalaryText(
					job?.minJdSalary ?? 0,
					job?.maxJdSalary ?? 0,
					job?.salaryCurrencyCode,
				)}
			</span>
			<Box className={styles['job-card__description']}>
				{job?.jobDetailsFromCompany?.substring(0, 700) ?? ''}
			</Box>
			<Button
				variant='text'
				className={styles['job-card__more-details']}
				disableTouchRipple
				disableRipple
			>
				View Job
			</Button>
			<Box className={styles['job-card__experience']}>
				<h4 className={styles['job-card__experience-header']}>
					Minimum Experience
				</h4>
				<p className={styles['job-card__experience-desc']}>
					{job?.minExp ?? '0'} years
				</p>
			</Box>
			<Box className={styles['job-card__actions']}>
				<Button
					variant='text'
					classes={{
						root: `${styles['job-card__action']} ${styles['job-card__action--primary']}`,
					}}
				>
					⚡ Easy Apply
				</Button>
				<Button
					variant='text'
					classes={{
						root: `${styles['job-card__action']} ${styles['job-card__action--secondary']}`,
					}}
				>
					<span className={styles['job-card__placeholder-img']}>
						{job.companyName?.charAt(0)}
					</span>
					<span className={styles['job-card__placeholder-img']}>
						{job.companyName?.charAt(1)}
					</span>
					Unlock referal asks
				</Button>
			</Box>
		</Card>
	);
};

export default JobCard;
