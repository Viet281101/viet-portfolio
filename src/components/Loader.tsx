import { Html, useProgress } from "@react-three/drei";
import React from 'react';

const CanvasLoader = () => {
	const { progress } = useProgress();
	return (
		<Html as='div' center className="flex flex-col items-center justify-center">
		<div className='w-full max-w-xl bg-gray-300 rounded-full h-4 dark:bg-gray-700'>
			<div className='bg-blue-600 h-4 rounded-full' style={{ width: `${progress}%` }} ></div>
		</div>
		<p className="text-[20px] text-slate-700 mt-4 flex items-center space-x-2">
			<span>Loading: </span>
			<span>{progress.toFixed(2)}%</span>
		</p>
		</Html>
	);
};

export default React.memo(CanvasLoader);
