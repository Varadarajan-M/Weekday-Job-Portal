import MUICard from '@mui/material/Card';

import { ComponentPropsWithoutRef } from 'react';
import styles from './Card.module.css';

const Card = ({ children, className }: ComponentPropsWithoutRef<'div'>) => {
	const classes = `${styles.card} ${className}`;
	return <MUICard className={classes}>{children}</MUICard>;
};

export default Card;
