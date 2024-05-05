import TextField, { TextFieldProps } from '@mui/material/TextField';
import React from 'react';

const Input: React.FC<TextFieldProps> = (props) => {
	return (
		<TextField
			{...props}
			sx={{
				'& .MuiInputBase-input': {
					padding: '8px 12px',
					borderRadius: '8px',
					minWidth: '170px',
					fontFamily: 'Lexend',
					fontSize: '1rem',
				},
			}}
		/>
	);
};

export default Input;
