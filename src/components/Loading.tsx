import React, { useEffect, useState, useRef } from 'react';

const Loading: React.FC = () => {
	const [progress, setProgress] = useState(0);
	const requestRef = useRef<number | null>(null);
	const start = useRef<DOMHighResTimeStamp | null>(null);

	const updateProgress = (timestamp: DOMHighResTimeStamp) => {
		if (!start.current) start.current = timestamp;
		const elapsed = timestamp - start.current;

		if (elapsed > 300) {
			setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 10 : 0));
			start.current = timestamp;
		}

		requestRef.current = requestAnimationFrame(updateProgress);
	};

	useEffect(() => {
		requestRef.current = requestAnimationFrame(updateProgress);
		return () => {
			if (requestRef.current) cancelAnimationFrame(requestRef.current);
		};
	}, []);

	return (
		<div className="loading-container">
			<div className="loading-bar">
				<div className="loading-progress" style={{ width: `${progress}%` }} />
			</div>
		</div>
	);
};

export default React.memo(Loading);
