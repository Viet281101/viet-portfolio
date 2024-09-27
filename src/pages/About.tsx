import React, { useEffect, useRef, useState } from 'react';

const About: React.FC = () => {
	const titleRef = useRef<HTMLDivElement>(null);
	const subtitleRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				} else {
					setIsVisible(false);
				}
			});
		},{ threshold: 0.5 });

		if (titleRef.current) observer.observe(titleRef.current);
		if (subtitleRef.current) observer.observe(subtitleRef.current);

		return () => {
			if (titleRef.current) observer.unobserve(titleRef.current);
			if (subtitleRef.current) observer.unobserve(subtitleRef.current);
		};
	}, []);

	return (
		<div className="about-container">
		<div ref={titleRef} className={`about-title ${isVisible ? 'animate-zoom-appear' : ''}`}>
			Quick look about me
		</div>
		<div ref={subtitleRef} className={`about-subtitle ${isVisible ? 'animate-slide-right' : ''}`}>
			Scroll Down
		</div>
		{/* Orther */}
		</div>
	);
};

export default React.memo(About);
