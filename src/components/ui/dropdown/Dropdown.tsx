import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import { useState } from 'react';
import styles from './Dropdown.module.css';

const renderTagCloseIcon = () => {
	return <span className={styles['dropdown__tag-close-icon']}>&times;</span>;
};

type DropdownProps = {
	multiSelect?: boolean;
	label?: string;
	options: { id: number; label: string; category?: string }[];
	onChange?: (selectedOptions: DropdownProps['options']) => void;
};

const Dropdown = ({ multiSelect = false, label, options }: DropdownProps) => {
	const [selectedOptions, setSelectedOptions] = useState<typeof options | null>(
		[options[0]],
	);
	return (
		<Box>
			{!multiSelect ||
				(multiSelect && (selectedOptions?.length ?? 0) > 0 && (
					<p className={styles['dropdown__label']}>{label}</p>
				))}
			<Autocomplete
				multiple={multiSelect}
				id='tags-outlined'
				options={options}
				getOptionLabel={(option) => option.label}
				defaultValue={[options[0]]}
				filterSelectedOptions
				onChange={(_, newValue) => {
					setSelectedOptions(newValue as typeof options);
				}}
				renderInput={(params) => <TextField {...params} placeholder='Filter' />}
				ChipProps={{
					size: 'small',
					deleteIcon: renderTagCloseIcon(),
					sx: {
						'.MuiChip-deleteIcon': {
							marginRight: '0 !important',
							color: 'black',
							fontWeight: '500',

							'&:hover': {
								color: 'indianred',
							},
						},
					},
				}}
				classes={{
					inputRoot: styles['dropdown__input-root'],
					input: styles['dropdown__input'],
					option: styles['dropdown__option'],
					groupLabel: styles['dropdown__group-label'],
				}}
				sx={{
					'.MuiAutocomplete-input': {
						minWidth: '8rem !important',
						padding: '2px 6px !important',
					},
					'.MuiAutocomplete-tag': {
						fontSize: '0.8rem',
						borderRadius: '0.6rem',
						height: '1.8rem',
						fontWeight: 400,
						color: 'rgb(51, 51, 51)',
						maxWidth: '15rem',
						textTransform: 'capitalize',
					},
					'.MuiAutocomplete-groupUl .MuiAutocomplete-option': {
						color: 'blue',
					},
				}}
				groupBy={(option) => option.category || 'All'}
			/>
		</Box>
	);
};

export default Dropdown;
