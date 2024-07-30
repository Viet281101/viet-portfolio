import React, { useEffect, useRef, ReactNode, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const sections = ['/', '/about', '/projects', '/courses', '/blog', '/contact'];

interface FullPageProps {
	children: ReactNode;
}

const FullPage: React.FC<FullPageProps> = ({ children }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const location = useLocation();
	const [canScroll, setCanScroll] = useState(true);
	const touchStartY = useRef<number | null>(null);

	const handleScroll = (event: WheelEvent | TouchEvent, deltaY: number) => {
		if (!canScroll) return;

		const container = containerRef.current;
		if (!container) return;

		const { scrollTop, scrollHeight, clientHeight } = container;
		const isAtBottom = scrollTop + clientHeight >= scrollHeight;
		const isAtTop = scrollTop === 0;

		if (deltaY > 0 && isAtBottom) {
			event.preventDefault();
			const currentIndex = sections.indexOf(location.pathname);
			if (currentIndex < sections.length - 1) {
				navigate(sections[currentIndex + 1]);
				setCanScroll(false);
			}
		} else if (deltaY < 0 && isAtTop) {
			event.preventDefault();
			const currentIndex = sections.indexOf(location.pathname);
			if (currentIndex > 0) {
				navigate(sections[currentIndex - 1]);
				setCanScroll(false);
			}
		}
	};

	const handleWheel = (event: WheelEvent) => {
		handleScroll(event, event.deltaY);
		setTimeout(() => setCanScroll(true), 1000);
	};

	const handleTouchStart = (event: TouchEvent) => {
		touchStartY.current = event.touches[0].clientY;
	};

	const handleTouchMove = (event: TouchEvent) => {
		if (touchStartY.current !== null) {
			const deltaY = touchStartY.current - event.touches[0].clientY;
			handleScroll(event, deltaY);
			setTimeout(() => setCanScroll(true), 1000);
		}
	};

	const handleTouchEnd = () => {
		touchStartY.current = null;
	};

	useEffect(() => {
		const container = containerRef.current;
		if (container) {
			container.addEventListener('wheel', handleWheel, { passive: false });
			container.addEventListener('touchstart', handleTouchStart, { passive: true });
			container.addEventListener('touchmove', handleTouchMove, { passive: false });
			container.addEventListener('touchend', handleTouchEnd, { passive: true });
		}
		return () => {
			if (container) {
				container.removeEventListener('wheel', handleWheel);
				container.removeEventListener('touchstart', handleTouchStart);
				container.removeEventListener('touchmove', handleTouchMove);
				container.removeEventListener('touchend', handleTouchEnd);
			}
		};
	}, [location, canScroll]);

	return <div ref={containerRef} className="fullpage-container" style={{ height: '100vh', overflowY: 'auto' }}>{children}</div>;
};

export default FullPage;
