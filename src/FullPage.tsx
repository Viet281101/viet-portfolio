import React, { useEffect, useRef, ReactNode, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const sections = ['/', '/about', '/projects', '/courses', '/blog', '/contact'];

interface FullPageProps {
	children: ReactNode;
	enableScroll?: boolean;
	onScroll?: (direction: 'up' | 'down') => void;
}

const FullPage: React.FC<FullPageProps> = ({ children, enableScroll = true, onScroll }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const location = useLocation();
	const [canScroll, setCanScroll] = useState(true);
	const [isNavigating, setIsNavigating] = useState(false);
	const touchStartY = useRef<number | null>(null);

	const handleScroll = (event: WheelEvent | TouchEvent, deltaY: number) => {
		if (!canScroll || isNavigating) return;

		const container = containerRef.current;
		if (!container) return;

		const { scrollTop, scrollHeight, clientHeight } = container;
		const isAtBottom = scrollTop + clientHeight >= scrollHeight;
		const isAtTop = scrollTop === 0;

		if (enableScroll) {
			if (deltaY > 0 && isAtBottom) {
				event.preventDefault();
				const currentIndex = sections.indexOf(location.pathname);
				if (currentIndex < sections.length - 1) {
					setIsNavigating(true);
					setTimeout(() => {
						navigate(sections[currentIndex + 1]);
						setTimeout(() => {
							setCanScroll(true);
							setIsNavigating(false);
						}, 1500);
					}, 1000);
				}
			} else if (deltaY < 0 && isAtTop) {
				event.preventDefault();
				const currentIndex = sections.indexOf(location.pathname);
				if (currentIndex > 0) {
					setIsNavigating(true);
					navigate(sections[currentIndex - 1]);
					setTimeout(() => {
						setCanScroll(true);
						setIsNavigating(false);
					}, 1500);
				}
			}
		}
		if (onScroll) { onScroll(deltaY > 0 ? 'down' : 'up'); }
	};

	const handleWheel = (event: WheelEvent) => {
		handleScroll(event, event.deltaY);
	};

	const handleTouchStart = (event: TouchEvent) => {
		touchStartY.current = event.touches[0].clientY;
	};

	const handleTouchMove = (event: TouchEvent) => {
		if (touchStartY.current !== null) {
			const deltaY = touchStartY.current - event.touches[0].clientY;
			handleScroll(event, deltaY);
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
	}, [location, canScroll, isNavigating]);

	return <div ref={containerRef} className="fullpage-container" style={{ height: '100vh', overflowY: 'auto' }}>{children}</div>;
};

export default React.memo(FullPage);
