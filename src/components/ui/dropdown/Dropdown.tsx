import { Fragment, useState } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

import styles from './Dropdown.module.css';

const renderTagCloseIcon = () => {
	return <span className={styles['dropdown__tag-close-icon']}>&times;</span>;
};

type DropdownProps = {
	multiSelect?: boolean;
	label?: string;
	options: { id: string; label: string; category?: string }[];
	onChange?: (selectedOptions: DropdownProps['options']) => void;
};

const Dropdown = ({
	multiSelect = false,
	label,
	options,
	onChange,
}: DropdownProps) => {
	const [selectedOptions, setSelectedOptions] = useState<typeof options | null>(
		[],
	);

	return (
		<Box>
			<Fragment>
				{!multiSelect ||
					(multiSelect && (selectedOptions?.length ?? 0) > 0 && (
						<p className={styles['dropdown__label']}>{label}</p>
					))}
				<Autocomplete
					multiple={multiSelect}
					options={options}
					getOptionLabel={(option) => option.label}
					filterSelectedOptions
					onChange={(_, newValue) => {
						setSelectedOptions(newValue as typeof options);
						onChange?.(newValue as typeof options);
					}}
					renderInput={(params) => (
						<TextField
							key={params.id}
							{...params}
							placeholder={(selectedOptions?.length ?? 0) < 1 ? label : ''}
						/>
					)}
					renderOption={(props, option) => {
						return (
							<li {...props} key={option.label}>
								{option.label}
							</li>
						);
					}}
					renderTags={(tagValue, getTagProps) => {
						return tagValue.map((option, index) => (
							<Chip
								{...getTagProps({ index })}
								key={option.label}
								label={option.label}
								size='small'
								deleteIcon={renderTagCloseIcon()}
								sx={{
									'.MuiChip-deleteIcon': {
										marginRight: '0 !important',
										color: 'black',
										fontWeight: '500',
										'&:hover': {
											color: 'indianred',
										},
									},
								}}
							/>
						));
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
							fontFamily: 'Lexend',
							fontSize: '1rem',
						},
						'.MuiAutocomplete-tag': {
							fontSize: '0.8rem',
							borderRadius: '0.2rem',
							height: '1.6rem',
							fontWeight: 400,
							color: 'rgb(51, 51, 51)',
							maxWidth: '15rem',
							textTransform: 'capitalize',
							fontFamily: 'Lexend',
							display: 'flex',
							alignItems: 'center',
						},
						'.MuiAutocomplete-groupUl .MuiAutocomplete-option': {
							color: 'blue',
						},
					}}
					groupBy={(option) => option?.category ?? ''}
				/>
			</Fragment>
		</Box>
	);
};

export default Dropdown;
