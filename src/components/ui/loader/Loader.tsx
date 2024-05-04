import Box from '@mui/material/Box';
import { ComponentPropsWithoutRef } from 'react';
import styles from './Loader.module.css';

type LoaderProps = {
	width?: string;
	height?: string;
} & ComponentPropsWithoutRef<'span'>;

const Loader = ({ width = '36', height = '36', ...props }: LoaderProps) => {
	return (
		<span
			className={styles.loader}
			style={{ width: `${width}px`, height: `${height}px` }}
			{...props}
		/>
	);
};

export const CenteredLoader = (props: LoaderProps) => (
	<Box
		display={'flex'}
		flexDirection='row'
		justifyContent='center'
		width='100%'
		my={2}
		p={2}
	>
		<Loader {...props} />
	</Box>
);

export default Loader;
