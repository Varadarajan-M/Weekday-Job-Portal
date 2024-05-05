import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setJobFilter } from '../../features/jobs/jobsSlice';
import useDebouncedValue from '../common/useDebouncedValue';

type Option = {
	id: string;
	label: string;
	category?: string;
};

const useJobFilters = () => {
	const dispatch = useDispatch();

	const [search, setSearch] = useState('');

	const debouncedSearchTerm = useDebouncedValue(search, 500);

	const handleJobFilter = useCallback(
		(filterName: string | null, value: Option | Option[] | null) => {
			let selectedOptions: string[] = [];
			if (Array.isArray(value)) {
				selectedOptions = [
					...new Set(
						value.map((option) => option.id?.toString()?.toLowerCase()),
					),
				];
			} else {
				selectedOptions = value ? [value?.id?.toLowerCase() as string] : [];
			}
			dispatch(
				setJobFilter({
					filterName,
					value: selectedOptions,
				}),
			);
		},
		[dispatch],
	);

	const handleSearch = useCallback((v: string) => {
		setSearch(v);
	}, []);

	useEffect(() => {
		dispatch(
			setJobFilter({ filterName: 'search', value: [debouncedSearchTerm] }),
		);
	}, [debouncedSearchTerm, dispatch]);

	return { handleJobFilter, handleSearch };
};

export default useJobFilters;
