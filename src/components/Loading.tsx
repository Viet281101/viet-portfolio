import React, { useEffect, useState } from 'react';

const Loading: React.FC = () => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 10 : 0));
		}, 300);
		return () => clearInterval(interval);
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
