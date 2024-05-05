import { JobDetails } from '../../types';

export const getNonEmptyFilters = (filters: Record<string, string[]>) => {
	const nonEmptyFilters = Object.entries(filters).filter(
		([, value]) => value && value?.length > 0,
	);
	return nonEmptyFilters;
};

export const checkLocationMatch = (
	job: JobDetails,
	filterKeyValues: Record<keyof JobDetails, string[]>,
) => {
	const set = new Set(filterKeyValues?.location);
	if (!set.size) return true;
	let locationMatch = false;
	if (set.size === 3) return true;
	if (set.has('remote')) {
		locationMatch = job?.location?.toLowerCase() === 'remote';
	}
	if (set.has('in-office')) {
		locationMatch =
			job?.location?.toLowerCase() !== 'remote' &&
			job?.location?.toLowerCase() !== 'hybrid';
	}
	if (set.has('hybrid')) {
		locationMatch = job?.location?.toLowerCase() === 'hybrid';
	}
	return locationMatch;
};

export const checkMinExpMatch = (
	job: JobDetails,
	filterKeyValues: Record<keyof JobDetails, string[]>,
) => {
	if (!filterKeyValues?.minExp?.length) return true;
	if (
		job?.minExp &&
		filterKeyValues?.minExp &&
		+job?.minExp >= +filterKeyValues?.minExp
	) {
		return true;
	}
};

export const checkRoleMatch = (
	job: JobDetails,
	filterKeyValues: Record<keyof JobDetails, string[]>,
) => {
	const set = new Set(filterKeyValues?.jobRole);
	if (!set.size) return true;
	return set.has(job?.jobRole?.toLowerCase());
};

export const checkMinSalaryMatch = (
	job: JobDetails,
	filterKeyValues: Record<keyof JobDetails, string[]>,
) => {
	if (!filterKeyValues?.minJdSalary?.length) return true;
	if (
		job?.minJdSalary &&
		filterKeyValues?.minJdSalary &&
		+job?.minJdSalary >= +filterKeyValues?.minJdSalary
	) {
		return true;
	}
};
