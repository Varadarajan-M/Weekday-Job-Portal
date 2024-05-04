import { useEffect, useRef } from 'react';

type InfiniteScrollProps = {
	onIntersection: () => void;
};

const InfiniteScroll = ({ onIntersection }: InfiniteScrollProps) => {
	const elementRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const target = elementRef?.current;
		const observer = new IntersectionObserver((entries) => {
			const [first] = entries;
			if (first?.isIntersecting) {
				onIntersection();
			}
		});
		if (target) {
			observer.observe(target);
		} else {
			observer.disconnect();
		}
	}, [elementRef, onIntersection]);

	return <div ref={elementRef} />;
};

export default InfiniteScroll;
