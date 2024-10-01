import React, { useEffect, useRef } from 'react';
import '../styles/about.scss';

const About: React.FC = () => {
	const titleRef = useRef<HTMLDivElement>(null);
	const subtitleRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					titleRef.current?.classList.add('fade-out');
					subtitleRef.current?.classList.add('fade-out');
				} else {
					titleRef.current?.classList.remove('fade-out');
					subtitleRef.current?.classList.remove('fade-out');
				}
			});
		}, { threshold: 0.2 });

		if (triggerRef.current) {
			observer.observe(triggerRef.current);
		}

		return () => {
			if (triggerRef.current) {
				observer.unobserve(triggerRef.current);
			}
		};
	}, []);

	return (
		<div className="about-section">
			<div className="about-container">
				<div ref={titleRef} className="about-title sticky-title">
				Quick look about me
				</div>
				<div ref={subtitleRef} className="about-subtitle sticky-subtitle">
				Scroll Down
				</div>
			</div>
			{/* Orther content */}
			<div ref={triggerRef} className="about-trigger"></div>
			<div className="about-content">
				<p>Some other content below after the title disappears.</p>
			</div>
		</div>
	);
};

export default React.memo(About);
