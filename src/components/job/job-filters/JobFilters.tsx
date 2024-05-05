import Dropdown from '../../ui/dropdown';
import Input from '../../ui/input';
import styles from './JobFilters.module.css';
import {
	experience,
	languages,
	minBasePay,
	noOfEmployees,
	remote,
	roles,
} from './data';

const filters = [
	{
		isMulti: true,
		label: 'Roles',
		options: roles,
	},
	{
		isMulti: true,
		label: 'No of Employees',
		options: noOfEmployees,
	},
	{
		isMulti: false,
		label: 'Experience',
		options: experience,
	},
	{
		isMulti: true,
		label: 'Remote',
		options: remote,
	},
	{
		isMulti: true,
		label: 'Tech stack',
		options: languages,
	},
	{
		isMulti: false,
		label: 'Min. Base pay',
		options: minBasePay,
	},
];

const JobFilters = () => {
	return (
		<div className={styles['job-filters']}>
			{filters.map((filter) => (
				<Dropdown
					key={filter.label}
					multiSelect={filter.isMulti}
					label={filter.label}
					options={filter.options}
					onChange={(d) => console.log(d)}
				/>
			))}
			<Input placeholder='Search Company Name' />
		</div>
	);
};

export default JobFilters;
