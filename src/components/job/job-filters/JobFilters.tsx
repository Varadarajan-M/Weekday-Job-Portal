import useJobFilters from '../../../hooks/jobs/useJobFilters';
import Dropdown from '../../ui/dropdown';
import Input from '../../ui/input';
import styles from './JobFilters.module.css';
import { experience, minBasePay, remote, roles } from './data';

const filters = [
	{
		isMulti: true,
		label: 'Roles',
		options: roles,
		filterName: 'jobRole',
	},
	// {
	// 	isMulti: true,
	// 	label: 'No of Employees',
	// 	options: noOfEmployees,
	// 	filterName: null, // This values are not returned by api for filtering
	// },
	{
		isMulti: false,
		label: 'Experience',
		options: experience,
		filterName: 'minExp',
	},
	{
		isMulti: true,
		label: 'Remote',
		options: remote,
		filterName: 'location',
	},
	// {
	// 	isMulti: true,
	// 	label: 'Tech stack',
	// 	options: languages,
	// 	filterName: null, // This values are not returned by api for filtering
	// },
	{
		isMulti: false,
		label: 'Minimum Base Pay Salary',
		options: minBasePay,
		filterName: 'minJdSalary',
	},
];

const JobFilters = () => {
	const { handleJobFilter, handleSearch } = useJobFilters();

	return (
		<div className={styles['job-filters']}>
			{filters.map((filter) => (
				<Dropdown
					key={filter.label}
					multiSelect={filter.isMulti}
					label={filter.label}
					options={filter.options}
					onChange={(option) => handleJobFilter(filter?.filterName, option)}
				/>
			))}
			<Input
				type='search'
				placeholder='Search Company Name'
				onChange={(e) => handleSearch(e.target.value)}
			/>
		</div>
	);
};

export default JobFilters;
